<?php
$target_dir = "uploads/";
echo var_dump($_FILES);
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
if($check !== false) {
	echo "File is an image - " . $check["mime"] . ".<br>";
	$uploadOk = 1;
} else {
	echo "File is not an image.<br>";
	$uploadOk = 0;
}

// Check if file already exists
if (file_exists($target_file)) {
	echo "Sorry, file already exists.<br>";
	$uploadOk = 0;
}

// Check file size
/*if ($_FILES["fileToUpload"]["size"] > 500000) {
echo "Sorry, your file is too large.";
$uploadOk = 0;
}*/

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
	echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";	
	$uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	echo "Sorry, your file was not uploaded.<br>";
// if everything is ok, try to upload file
} else {
	if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
		sendRequest();
		sleep(3);
		echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.<br>";		
	} else {
		echo "Sorry, there was an error uploading your file.<br>";
	}
}

function sendRequest() {
	$url = "https://lhs-humans.glitch.me/update";

	$data = array(
		'img' => "media/" . $_FILES["fileToUpload"]["name"],
		'desc' => $_GET["desc"]
	);
	
	//$data = json_encode($raw);
	//echo $data;
	//echo gettype($raw);
	echo gettype($data);


	$ch = curl_init($url);
	# Form data string
	$postString = http_build_query($data, '', '&');
	# Setting our options
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	# Get the response
	$response = curl_exec($ch);
	curl_close($ch);
	// use key 'http' even if you send the request to https://...
	/*$options = array(
		'http' => array(
			'header'  => "Content-type: application/json",
			'method'  => 'POST',
			'content' => http_build_query($raw)
		)
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);*/

	/*if ($result === FALSE) { 
		echo "post failed<br>";
		return;
	 }*/
	var_dump($response);
}
?>