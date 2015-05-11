<?
	class Company {

		private $company_data = false;

		//+++++

		function __construct($company_id = null) {
			$this->db = DB::getInstance();
			$this->user = !empty($_SESSION['user']) ? $_SESSION['user'] : null;

			if (!empty($company_id) && is_numeric($company_id)){
				$sql = 'SELECT id, encoded_id, name, reg_key, created_on FROM company WHERE id = ?';
				$company = $this->db->query($sql, array($company_id));

				if (!empty($company))
					$this->company_data = $company[0];
				else
					return false;
			}
		}

		//+++++

		public function get_data() {
			return $this->company_data;	
		}


		//+++++
		public function add_new($name, $description = null, $phone = null) {
			if (empty($this->get_company_data_by_name($name)) && $this->user->role_id == 3){
				$reg_key = $this->generate_reg_key();
				$sql = 'INSERT INTO company (name, description, reg_key, phone) VALUES (?, ?, ?, ?)';
				$company_id = $this->db->insert($sql, array($name, $description, $reg_key, $phone));
				$sql = 'UPDATE company SET encoded_id = ? WHERE id = ?';
				$this->db->execute($sql, array(Tools::encode_company_id($company_id), $company_id));
				return array('id' => $company_id, 'encoded_id' => Tools::encode_company_id($company_id), 'reg_key' => $reg_key);
			}
			else{
				return false;
			}
		}
		//+++++
		public function get_company_data_by_name($name){
			$sql = 'SELECT id FROM company WHERE name = ?';
			return $this->db->query($sql, array($name));
		}

		//+++++
		public function update($name, $description, $phone) {
			if($this->company_data && $this->user->role_id == 3 && !empty($name)){
				$sql = 'UPDATE company SET name = ?, description = ?, phone = ? WHERE id = ?';
				$this->db->execute($sql, array($name, $description, $phone, $this->company_data['id']));

				$this->company_data['name'] = $name;
				$this->company_data['description'] = $description;

				return $this->company_data;
			}
			else
				return false;
		}
		//+++++
		public function remove() {
			if($this->company_data && $this->user->role_id == 3){
				$sql = 'DELETE FROM company WHERE id = ?';
				$this->db->execute($sql, array($this->company_data['id']));
				return true;
			}
			else
				return false;
		}

		public function getAll($user_id = 0){
			if($this->user->role_id == 3){
				$sql = 'SELECT 
							c.id,
							c.encoded_id,
							c.name,
							c.description,
							c.reg_key,
							c.created_on,
							c.phone,
							ui.email as manager_email,
							ui.phone as manager_phone,
							ui.first_name as manager_fn,
							ui.last_name as manager_ln,
							IF(cu.user_id = ?, true, false) AS is_manager
						FROM company as c
						LEFT JOIN company_users as cu ON cu.company_id = c.id AND cu.role_id = 2
						LEFT JOIN user_info as ui ON ui.user_id = cu.user_id';
				return $this->db->query($sql, array($user_id));
			}
			else
				return false;
		}

		public function generate_reg_key(){
			srand(time());
        	$random_key = rand(10000000, 99999999);
        	return base64_encode($random_key);
		}

		public function get_company_data_by_key($key) {
			$sql = 'SELECT id, encoded_id, name, reg_key, created_on FROM company WHERE reg_key = ?';
			$company = $this->db->query($sql, array($key));

			if (!empty($company)){
				$this->company_data = $company[0];
				return $company;
			}
			else
				return false;
		}

		public function add_user_to_company($user_id){
			if($this->company_data){
				$sql = 'INSERT INTO company_users (user_id,	company_id) VALUES (?,?)';
				$this->db->insert($sql, array($user_id, $this->company_data['id']));
				return true;
			}
			else
				return false;
		}

		public function set_company_manager($user_email){
			if($this->company_data){
				$sql = 'SELECT user_id FROM user_info WHERE email = ?';
				$user_id = $this->db->query($sql, array($user_email));
				$sql = 'UPDATE company_users SET role_id = ? WHERE user_id = ? AND company_id= ?';
				$this->db->insert($sql, array(2, $user_id[0]['user_id'], $this->company_data['id']));
				$sql = 'SELECT role_id FROM user_roles WHERE user_id = ?';
				$user_role = $this->db->query($sql, array($user_id[0]['user_id']));
				if($user_role[0]['role_id'] == 1) {
					$sql = 'UPDATE user_roles SET role_id = ? WHERE user_id = ?' ;
					$this->db->execute($sql, array(2, $user_id[0]['user_id']));
				}
				

				//$sql = 'INSERT INTO company_users AS cu VALUES (?, ?, ?)';
			}

		}
	}
?>