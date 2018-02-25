<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $firstname = strip_tags(trim($_POST["firstname"]));
        $lastname = strip_tags(trim($_POST["lastname"]));
        $phone = strip_tags(trim($_POST["phone"]));
				$firstname = str_replace(array("\r","\n"),array(" "," "),$firstname);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($firstname) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Hubo un problema con el envio. Completa el formulario e inténtalo otra vez.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "ventas@corporacionmerati.com";
        // $recipient = "...d@gmail.com"; // just for testing

        // Set the email subject.
        $subject = "Nuevo contacto del formulario de contacto $firstname";

        // Build the email content.
        $email_content = "Nombre: $firstname\n";
        $email_content .= "Apellidos: $lastname\n";
        $email_content .= "Teléfono: $phone\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Mensaje:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $firstname <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Gracias por confiar en nosotros, de inmediato uno de nuestros representantes se comunicará contigo.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Hubo un problema, no pudimos enviar tu mensaje.";
        }

        // Send email to contact
        $recipient_to_contact = $email;
        $subject_to_contact = "Corporación Agromerati S.A.C.";
        $email_to_contact = "ventas@corporacionmerati.com";
        $email_headers_to_contact = "From: Corporación Agromerati S.A.C. <$email_to_contact>";
        $email_content_to_contact .= "Gracias por comunicarte con nosotros, en breve estaremos comunicandonos contigo.";

        if (mail($recipient_to_contact, $subject_to_contact, $email_content_to_contact, $email_headers_to_contact)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con el envio, por favor inténtalo de nuevo.";
    }

?>
