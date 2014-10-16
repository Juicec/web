<?
	class User {
	
		public $id = null;
		public $ip = true;
		public $name = true;
		
		function __construct() { 
			$this->ip = $_SERVER["REMOTE_ADDR"];
			$this->id = null;
			$this->name = null;
		}
		
		public function upd_session_array(){
			$_SESSION['id'] = $this->id;
			$_SESSION['ip'] = $this->ip;
			$_SESSION['name'] = $this->name;
		}
	}
?>