<?php
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  // Si falta alguno de los campos requeridos o el correo no es válido
  http_response_code(400); // En lugar de 500, usa 400 para errores de validación del cliente
  exit("Los datos proporcionados no son válidos.");
}

// Sanitización de la entrada
$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Configuración del destinatario y el asunto
$to = "omarine165@gmail.com"; // Cambia este email a tu correo
$subject = "$m_subject: $name";

// Cuerpo del mensaje
$body = "Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web.\n\n";
$body .= "Aquí están los detalles:\n\n";
$body .= "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "Asunto: $m_subject\n";
$body .= "Mensaje:\n$message";

// Encabezados adicionales
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Intentar enviar el correo
if(!mail($to, $subject, $body, $headers)) {
  http_response_code(500); // Error en el servidor al intentar enviar el correo
  exit("Ocurrió un error al intentar enviar el mensaje.");
} else {
  http_response_code(200); // Envío exitoso
  exit("Mensaje enviado con éxito.");
}
?>
