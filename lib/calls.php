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

		public function upload(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id == 3 && !empty($_FILES['userfile'])){
				move_uploaded_file ($_FILES['userfile'] ['tmp_name'], "img/{$_FILES['userfile'] ['name']}");
				$this->return_json(array( 'path' => "/img/{$_FILES['userfile'] ['name']}"));
			}
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

		public function get_company_info_to_manager(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['user_id'])){
				$this->company = new Company();
				$company_info = $this->company->get_company_info_by_manager_id($_REQUEST['user_id']);
				$this->return_json($company_info[0]);
			}
			else
				$this->return_error(1);
		}

		public function get_company_users_to_manager(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['user_id'])){
				$this->company = new Company();
				$this->return_json(array('users' => $this->company->get_company_users_by_manager_id($_REQUEST['user_id'])));
			}
			else
				$this->return_error(1);
		}

		public function get_categories() {
			if ($_SESSION['is_login']){
				$_category = new Category();
				$data = $_category->search_by_key(isset($_REQUEST['key']) ? $_REQUEST['key'] : null);
				$this->return_json(array('categories' => $data));
			}
			else
				$this->return_error(1);
		}

		public function get_units() {
			if ($_SESSION['is_login']){
				$_item = new Item();
				$data = $_item->get_units();
				$this->return_json(array('units' => $data));
			}
			else
				$this->return_error(1);
		}
		// ITEMS

		public function get_items() {
			if ($_SESSION['is_login']){
				$_item = new Item();
				$data = $_item->get_items();
				$this->return_json(array('items' => $data));
			}
			else
				$this->return_error(1);
		}

		public function save_item() {
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id == 3 && !empty($_REQUEST['name']) && is_numeric($_REQUEST['price']) &&
				!empty($_REQUEST['description'])&& is_numeric($_REQUEST['category_id']) && is_numeric($_REQUEST['unit_id'])){
				
				$_item = new Item();
				$new_data = $_item->add_new($_REQUEST['name'], $_REQUEST['price'], $_REQUEST['description'], $_REQUEST['img'] , $_REQUEST['category_id'] , $_REQUEST['unit_id']);
				if(!empty($new_data)){
					$this->return_json(array('item' => $new_data));
				}
				else{
					$this->return_error(2);
				}
				
			}
			else{
				$this->return_error(1);
			}
		}

		public function update_item(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id == 3 && !empty($_REQUEST['name']) && !empty($_REQUEST['id']) && is_numeric($_REQUEST['price']) &&
				!empty($_REQUEST['description'])&& is_numeric($_REQUEST['category_id']) && is_numeric($_REQUEST['unit_id'])){
				
				$_item = new Item($_REQUEST["id"]);
				$new_data = $_item->update($_REQUEST['name'], $_REQUEST['price'], $_REQUEST['description'], $_REQUEST['img'] , $_REQUEST['category_id'] , $_REQUEST['unit_id']);
				if(!empty($new_data)){
					$this->return_json(array('item' => $new_data));
				}
				else{
					$this->return_error(2);
				}
				
			}
			else{
				$this->return_error(1);
			}
		}

		public function remove_item(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id == 3 && !empty($_REQUEST['id'])){				
				$_item = new Item($_REQUEST["id"]);
				$_item->remove();
				$this->return_json($_REQUEST);
			}
			else{
				$this->return_error(1);
			}
		}

		public function save_category() {
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id == 3 && !empty($_REQUEST['name'])) {
				$_category = new Category();
				$new_data = $_category->add_new($_REQUEST['name'], $_REQUEST['img']);
				if(!empty($new_data)){
					$this->return_json(array('category' => $new_data));
				}
				else{
					$this->return_error(2);
				}
			}
			else
				$this->return_error(1);
		}

		public function confirm_user(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['user_email'])){
				$this->company = new Company();
				$this->company->confirm_user($_REQUEST['user_email']);
				$this->return_json($_REQUEST);
			}
			else
				$this->return_error(1);
		}

		public function delete_user(){
			if ($_SESSION['is_login'] && $_SESSION['user']->role_id != 1 && !empty($_REQUEST['user_email'])){
				$this->company = new Company();
				$this->company->delete_user($_REQUEST['user_email']);
				$this->return_json($_REQUEST);
			}
			else
				$this->return_error(1);
		}

		// SHOP CART
		public function add_to_shop_cart() {
			if ($_SESSION['is_login'] && is_numeric($_REQUEST['item_id']) && is_numeric($_REQUEST['qty'])){
				$_sc = new ShopCart();
				$_sc->add_new_product($_REQUEST['item_id'], $_REQUEST['qty']);
				$this->return_json(array());
			}
			else
				$this->return_error(1); 
		}

		public function get_shopcart() {
			if ($_SESSION['is_login']){
				$_sc = new ShopCart();
				$this->return_json(array('shopcart' => $_sc->get_shop_cart()));
			}
			else
				$this->return_error(1); 
		}
	}
?>