<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../src/Client.php';
require_once __DIR__ . '/../src/Format.php';
require_once __DIR__ . '/../src/Product.php';
require_once __DIR__ . '/../src/Type.php';
$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(false, true, true);
$app->addBodyParsingMiddleware();

const JWT_SECRET = "makey1234567";
const BASE_PATH = "./data/";

$repoProducts = $entityManager->getRepository('Product');
$repoTypes = $entityManager->getRepository('Type');
$repoFormats = $entityManager->getRepository('Format');
$repoClient = $entityManager->getRepository('Client');

function getJsonData($objs) {
    $list = [];
    for ($i=0; $i<count($objs); $i++) {
        $list[] = $objs[$i]->toJson();
    }
    return $list;
}

function addCorsHeaders (Response $response) : Response {

    //$response =  $response
    //->withHeader("Access-Control-Allow-Origin", 'http://localhost:4200') // faire test Access-Control-Allow-Origin
    //->withHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization')
    //->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    //->withHeader("Access-Control-Expose-Headers" , "Authorization");

    return $response;
}

function options (Request $request, Response $response) {
    // Evite que le front demande une confirmation à chaque modification
    $response = addCorsHeaders($response);
    $response = $response->withHeader("Access-Control-Max-Age", 60);

    return addHeaders ($response,$request->getHeader('Origin'));
}

// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/login","/api/register"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->options('/api/login', function($request, $response) {
    return options($request, $response);
});
$app->post('/api/login', function ($request, $response, $args) {
    global $repoClient;
    $body = $request->getParsedBody();
    $user = $repoClient->findBy(["login" => $body["login"], "password" => $body["password"]]);
    if ($user == null || count($user) == 0) {
        $data = array("Erreur" => "Identifiants incorrects");
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode($data));
        return $response;
    }

    $issuedAt = time();
    $expirationTime = $issuedAt +  60 * 60 * 1000;
    $payload = array(
        'userid' => "12345",
        'email' => "emmanuel.maurice@gmail.com",
        'pseudo' => "emma",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    $response = addCorsHeaders($response);
    $user = $user[0];
    $user->setPassword("*****");
    $response->getBody()->write(json_encode(getJsonData([$user])[0]));
    return $response;
});



$app->options('/api/products', function($request, $response) {
    return options($request, $response);
});
$app->get('/api/products', function (Request $request, Response $response, $args) {
    global $repoProducts;
    $products = $repoProducts->findAll();
    $list = getJsonData($products);
    $response->getBody()->write(json_encode($list));
    $response = addCorsHeaders($response);
    return $response;
});
$app->get('/api/products/{ref}', function (Request $request, Response $response, $args) {
    global $repoProducts;
    $products = $repoProducts->findBy(["ref" => $args["ref"]]);
    $list = getJsonData($products);
    $response->getBody()->write(json_encode($list));
    $response = addCorsHeaders($response);
    return $response;
});
$app->get('/api/products/related/{ref}', function (Request $request, Response $response, $args) {
    global $repoProducts;
    $products = $repoProducts->findAll();
    $p = $repoProducts->findBy(["ref" => $args["ref"]])[0];
    $list = [];
    for ($i=0; $i<count($products); $i++) {
        if ($products[$i]->getType()->getId() == $p->getType()->getId() 
        && $p->getFormat()->getId() == $products[$i]->getFormat()->getId() 
        && $p->getRef() != $products[$i]->getRef())
            $list[] = $products[$i];
    }
    $response->getBody()->write(json_encode(getJsonData($list)));
    $response = addCorsHeaders($response);
    return $response;
});
$app->post('/api/product', function($request, $response, $args) {
    $body = $request->getParsedBody();
    $product = new Product();
    $product->setName($body["name"]);
    $product->setPrice($body["price"]);
    $product->setPic($body["pic"]);
    $product->setAmount($body["amount"]);
    $product->setRef($body["ref"]);

    global $repoTypes;
    $type = $repoTypes->findBy(["id" => $body["type"]]);
    $product->setType($type[0]);

    global $repoFormats;
    $format = $repoFormats->findBy(["id" => $body["format"]]);
    $product->setFormat($format[0]);
    
    global $entityManager;
    $entityManager->persist($product);
    $entityManager->flush();

    global $repoProducts;
    $p = $repoProducts->findBy(["ref" => $body["ref"]]);
    $response->getBody()->write(json_encode(getJsonData($p)));
    $response = addCorsHeaders($response);
    return $response;
});
$app->delete("/api/product/{id}", function($request, $response, $args) {
    global $entityManager;
    global $repoProducts;
    $p = $repoProducts->findBy(["id" => $args["id"]]);
    if (count($p) > 0) {
        $entityManager->remove($p[0]);
        $entityManager->flush();
    }
    return $response;
});



$app->options('/api/types', function($request, $response) {
    return options($request, $response);
});
$app->get('/api/types', function(Request $request, Response $response, $args) {
    global $repoTypes;
    $types = $repoTypes->findAll();
    $list = getJsonData($types);
    $response->getBody()->write(json_encode($list));
    $response = addCorsHeaders($response);
    return $response;
});



$app->options('/api/formats', function($request, $response) {
    return options($request, $response);
});
$app->get('/api/formats', function(Request $request, Response $response, $args) {
    global $repoFormats;
    $formats = $repoFormats->findAll();
    $list = getJsonData($formats);
    $response->getBody()->write(json_encode($list));
    $response = addCorsHeaders($response);
    return $response;
});



$app->options('/api/user', function($request, $response) {
    return options($request, $response);
});
$app->get('/api/users', function(Request $request, Response $response, $args) {
    global $repoClient;
    $users = $repoClient->findAll();
    $list = getJsonData($users);
    $response->getBody()->write(json_encode($list));
    $response = addCorsHeaders($response);
    return $response;
});
$app->post("/api/register", function($request, $response, $args) {
    $body = $request->getParsedBody();
    $user = new Client();
    $user->setName($body["name"]);
    $user->setLogin($body["login"]);
    $user->setPassword($body["password"]);
    $user->setMail($body["mail"]);
    $user->setPhone($body["phone"]);
    
    global $entityManager;
    $entityManager->persist($user);
    $entityManager->flush();

    global $repoClient;
    $user = $repoClient->findBy(["login" => $body["login"], "password" => $body["password"]]);
    $response->getBody()->write(json_encode(getJsonData($user)));
    $response = addCorsHeaders($response);
    return $response;
});
$app->delete("/api/user/{id}", function($request, $response, $args) {
    global $entityManager;
    global $repoClient;
    $user = $repoClient->findBy(["id" => $args["id"]]);
    if (count($user) > 0) {
        $entityManager->remove($user[0]);
        $entityManager->flush();
    }
    return $response;
});



// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();