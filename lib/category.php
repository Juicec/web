<?
	class Category {

		private $category_data = false;

		function __construct($category_id = null) {
			$this->db = DB::getInstance();
			$this->user = !empty($_SESSION) ? $_SESSION['user'] : null;

			if (!empty($category_id) && is_numeric($category_id)){
				$sql = 'SELECT id, name, img FROM items_categories WHERE id = ?';
				$category = $this->db->query($sql, array($category_id));

				if (!empty($category))
					$this->category_data = $category[0];
				else
					return false;
			}
		}

		public function search_by_key($key = null){
			if (!empty($key)){
				$cool_key = '%'.mb_convert_case($key, MB_CASE_LOWER, "UTF-8").'%';
	
				$sql = 'SELECT id, name, img FROM items_categories WHERE lower(name) LIKE ?';
				return $this->db->query($sql, array($cool_key));
			}
			else{
				$sql = 'SELECT id, name, img FROM items_categories';
				return $this->db->query($sql, array());
			}
		}

		public function add_new($name, $img = null) {
			if(!$this->category_data && $this->user->role_id == 3 && !empty($name)){
				$sql = 'INSERT INTO items_categories (name, img) VALUES ( ?, ?)';
				$category_id = $this->db->insert($sql, array($name, $img));

				$this->category_data = array(
											'id' => $category_id,
											'name' => $name,
											'img' => $img
										);
				return $this->category_data;
			}
			else
				return false;
		}
	}

?>