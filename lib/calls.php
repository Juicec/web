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
			if(!empty($_REQUEST['name'])&& !empty($_REQUEST['description']) && !empty($_REQUEST['phone'])) {
				$new_data = $this->company->add_new($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['phone']);
				if(!$new_data){
					$this->return_error(2);
				}
				else{
					$this->return_json($new_data);
				}
				
			}
			else{
				$this->return_error(1);
			}
		}

		public function update_company(){
			if(!empty($_REQUEST['name'])&& !empty($_REQUEST['description']) && !empty($_REQUEST['phone']) && !empty($_REQUEST['id'])){
				$this->company = new Company($_REQUEST['id']);
				$this->company->update($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['phone']);
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
			if ($_SESSION['is_login']){
				$this->company = new Company();
				$this->return_json(array('companies' => $this->company->getAll($_SESSION['user']->user_id)));
			}
			else
				$this->return_error(1);
		}

		public function get_reg_key(){
			if ($_SESSION['is_login']){
				$this->company = new Company();
				$this->return_json(array('key' => $this->company->generate_reg_key()));
			}
			else
				$this->return_error(1);
		}
		//End of company calls

		// USER SEARCH PART
		// TODO должно быть из одной компании
		public function search_users(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['key'])){
				$data = $this->user->search_by_key($_REQUEST['key']);
				$this->return_json(array('users' => $data));
			}
			else
				$this->return_error(1);
		}


		public function company_manager_set(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['company_id'] && !empty($_REQUEST['email']))){
				$this->company = new Company($_REQUEST['company_id']);
				$user_id = $this->company->set_company_manager($_REQUEST['email']);
				$this->return_json($_REQUEST);
			}
			else
				$this->return_error(1);
		}

		public function company_manager_delete(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['company_id'] && !empty($_REQUEST['email']))){
				$this->company = new Company($_REQUEST['company_id']);
				$user_id = $this->company->delete_company_manager($_REQUEST['email']);
				$this->return_json($_REQUEST);
			}
			else
				$this->return_error(1);
		}


	}
?>