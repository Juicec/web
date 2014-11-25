<?
	class Model {
		
		function __construct() {
			try {
				$dbh = new PDO($dsn, $user, $password);
			} catch (PDOException $e) {
				die('Подключение не удалось: ' . $e->getMessage());
			}
			$this->db = new PDO()
		}
	}
?>