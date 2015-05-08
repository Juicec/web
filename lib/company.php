<?
	class Company {

		private $company_data = false;

		//+++++

		function __construct($company_id = null) {
			$this->db = DB::getInstance();
			$this->user = !empty($_SESSION) ? $_SESSION['user'] : null;

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
		public function add_new($name, $description = null, $reg_key = null) {
			if (empty($this->get_company_data_by_name($name)) && $this->user->role_id == 3){
				$sql = 'INSERT INTO company (name, encoded_id, description, reg_key) VALUES (?, ?, ?, ?)';
				$company_id = $this->db->insert($sql, array("new_name", "new_encoded_id", "new_desc", "new_reg_key"));
				$sql = 'UPDATE company SET encoded_id = ?, name = ?, description = ?, reg_key = ?  WHERE id = ?';
				$this->db->execute($sql, array(Tools::encode_company_id($company_id), $name, $description, $reg_key, $company_id));
			}
			else{
				var_dump('already reg');
			}
		}
		//+++++
		public function get_company_data_by_name($name){
			$sql = 'SELECT id FROM company WHERE name = ?';
			return $this->db->query($sql, array($name));
		}

		//+++++
		public function update($name, $description = null, $reg_key = null) {
			if($this->company_data && $this->user->role_id == 3 && !empty($name)){
				$sql = 'UPDATE company SET name = ?, description = ?, reg_key = ? WHERE id = ?';
				$this->db->execute($sql, array($name, $description, $reg_key, $this->company_data['id']));

				$this->company_data['name'] = $name;
				$this->company_data['description'] = $description;
				$this->company_data['reg_key'] = $reg_key;

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

		public function getAll(){
			if($this->user->role_id == 3){
				$sql = 'SELECT * FROM company';
				return $this->db->query($sql, array());
			}
			else
				return false;
		}
	}
?>