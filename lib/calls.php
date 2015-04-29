<?
	class Calls extends view {

		function __construct() { 
			$this->ip = $_SERVER["REMOTE_ADDR"];
			$this->encoded_user_id = null;
			$this->first_name = null;
			$this->last_name = null;
			$this->email = null;
			$this->db = DB::getInstance();
			$this->user = User::getInstance();
		}
		
		public function my_first_api(){
			$this->return_json($_SESSION);
		}

		public function auth(){
			if (!empty($_REQUEST['email']) && !empty($_REQUEST['password'])){
				if ($this->user->auth_user($_REQUEST['email'], $_REQUEST['password']))
					$this->return_json($_SESSION);
				else
					$this->return_error(1);
			}
			else{
				$this->return_error(2);
			}
		}

		public function logout(){
			$this->user->session_destroy();
			$this->return_json(array('req' => 'OK'));
		}
	}
?>