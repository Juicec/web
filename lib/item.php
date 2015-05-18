<?
	class Item {

		private $item_data = false;

		function __construct($item_id = null) {
			$this->db = DB::getInstance();
			$this->user = !empty($_SESSION) ? $_SESSION['user'] : null;

			if (!empty($item_id) && is_numeric($item_id)){
				$sql = 'SELECT id, name, price, description, img FROM items WHERE id = ?';
				$item = $this->db->query($sql, array($item_id));

				if (!empty($item))
					$this->item_data = $item[0];
				else
					return false;
			}
		}

		public function get_data() {
			return $this->item_data;	
		}

		public function add_new($name, $price, $description = null, $img = null, $category_id = null, $unit_id = null) {
			if(!$this->item_data && $this->user->role_id == 3 && !empty($name) && !empty($price)){
				$sql = 'INSERT INTO items (name, price, description, img, category_id, unit_id) VALUES ( ?, ?, ?, ?, ?, ?)';
				$item_id = $this->db->insert($sql, array($name, $price, $description, $img, $category_id, $unit_id));

				$this->item_data = array(
											'id' => $item_id,
											'name' => $name,
											'price' => $price,
											'description' => $description,
											'img' => $img,
											'category_id' => $category_id,
											'unit_id' => $unit_id
										);
				return $this->item_data;
			}
			else
				return false;
		}

		public function update($name, $price, $description = null, $img = null, $category_id = null, $unit_id = null) {
			if($this->item_data && $this->user->role_id == 3 && !empty($name) && !empty($price)){
				$sql = 'UPDATE items SET name = ?, price = ?, description = ?, img = ?, category_id = ?, unit_id = ? WHERE id = ?';
				$this->db->execute($sql, array($name, $price, $description, $img, $category_id, $unit_id, $this->item_data['id']));

				$this->item_data['name'] = $name;
				$this->item_data['price'] = $price;
				$this->item_data['description'] = $description;
				$this->item_data['img'] = $img;
				$this->item_data['category_id'] = $category_id;
				$this->item_data['unit_id'] = $unit_id;

				return $this->item_data;
			}
			else
				return false;
		}

		public function remove() {
			if($this->item_data && $this->user->role_id == 3){
				$sql = 'DELETE FROM items WHERE id = ?';
				$this->db->execute($sql, array($this->item_data['id']));
				return true;
			}
			else
				return false;
		}

		public function get_items() {
			$sql = 'SELECT i.id, i.name, i.price, i.description, i.img, ic.name as category_name, u.short_name as unit_name, i.category_id, i.unit_id
					FROM items as i, units as u, items_categories as ic 
					WHERE u.id = i.unit_id AND ic.id = i.category_id';
			return $this->db->query($sql, array());
		}

		public function get_units() {
			$sql = 'SELECT * FROM units';
			return $this->db->query($sql, array());
		}
	}
?>