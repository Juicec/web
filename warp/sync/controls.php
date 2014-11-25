<?
	class User {
	
		public $encoded_id = null;
		public $ip = true;
		public $name = true;
		
		function __construct() { 
			$this->ip = $_SERVER["REMOTE_ADDR"];
			$this->encoded_id = null;
			$this->name = null;
		}
		
		public function upd_session_array(){
			$session_this = clone $this;
            $_SESSION['user'] = $session_this;
		}
	}
?>