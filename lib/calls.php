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

		public function check_auth(){
			if (!empty($_REQUEST['email']) && !empty($_REQUEST['password'])){
				if ($this->user->check_user_password($_REQUEST['email'], $_REQUEST['password']))
					$this->return_json($_SESSION);
				else
					$this->return_error(1);
			}
			else{
				$this->return_error(2);
			}
		}

		public function register(){
			if(!empty($_REQUEST['email']) && !empty($_REQUEST['password']) && 
				!empty($_REQUEST['first_name']) && !empty($_REQUEST['last_name']) && !empty($_REQUEST['company_key'])){
				$status = $this->user->make_new_user($_REQUEST['email'], $_REQUEST['password'], $_REQUEST['company_key'], $_REQUEST['first_name'], $_REQUEST['last_name'], $_REQUEST['phone']);
				$this->return_json(array('reg_status' => $status));
			}
			else{
				$this->return_error(1);
			}
		}

		public function get_user_data() {
			$this->return_json($_SESSION);
		}

		public function logout(){
			$this->user->session_destroy();
			//$this->return_json($_SESSION);
			$this->return_json(array('req' => 'OK'));
		}
		// Beginning of Company calls
		public function add_company(){
			$this->company = new Company();
			if(!empty($_REQUEST['name'])&& !empty($_REQUEST['description'])) {
				if(!$this->company->add_new($_REQUEST['name'], $_REQUEST['description'])){
					$this->return_error(2);
				}
				else{
					$this->return_error(0);
				}
				
			}
			else{
				$this->return_error(1);
			}
		}

		public function update_company(){
			if(!empty($_REQUEST['name'])&& !empty($_REQUEST['description']) && !empty($_REQUEST['reg_key']) && !empty($_REQUEST['id'])){
				$this->company = new Company($_REQUEST['id']);
				$this->company->update($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['reg_key']);
				$this->return_json($_REQUEST);
			}
			else{
				$this->return_error(1);
			}
		}

		public function remove_company(){
			if(!empty($_REQUEST['id'])){
				$this->company = new Company($_REQUEST['id']);
				$this->company->remove();
				$this->return_json($_REQUEST);
			}
			else{
				$this->return_error(1);
			}
		}

		public function get_companies(){
			$this->company = new Company();
			$this->return_json(array('companies' => $this->company->getAll()));
		}

		public function get_reg_key(){
			$this->company = new Company();
			$this->return_json(array('key' => $this->company->generate_reg_key()));
		}
		//End of company calls
	}
?>