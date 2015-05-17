<?
	class ShopCart {

		private $shopcart = false;

		function __construct() {
			$this->db = DB::getInstance();
			$this->user = !empty($_SESSION) ? $_SESSION['user'] : null;

			if (is_numeric($this->user->user_id)){
				$sql = 'SELECT i.id, i.name, i.price, i.description, i.img, ic.name as category_name, u.short_name as unit_name, i.category_id, sc.value
						FROM shop_cart as sc, items as i, items_categories as ic, units as u
						WHERE i.id = sc.item_id AND u.id = i.unit_id AND ic.id = i.category_id AND sc.user_id = ?';
				$shop_cart = $this->db->query($sql, array($this->user->user_id));

				if (!empty($shop_cart))
					$this->shopcart = $shop_cart;
				else
					return false;
			}
		}

		public function add_new_product($item_id, $qty) {
			if(is_numeric($this->user->user_id) && is_numeric($item_id) && is_numeric($this->user->company_id) && is_numeric($qty)){
				$old_qty = $this->check_for_existence($item_id);
				if ($old_qty === 0)
					$sql = 'INSERT INTO shop_cart (value, user_id, item_id, company_id) VALUES ( ?, ?, ?, ?)';
				else
					$sql = 'UPDATE shop_cart SET value = ? WHERE user_id = ? AND item_id = ? AND company_id = ?';

				$this->db->insert($sql, array($qty + $old_qty, $this->user->user_id, $item_id, $this->user->company_id));
				return true;
			}
			else
				return false;
		}

		public function get_shop_cart() {
			return $this->shopcart;
		}

		public function check_for_existence($item_id){
			foreach ($this->shopcart as $item) {
				if ($item['id'] == $item_id)
					return $item['value'];
			}
			return 0;
		}
	}
?>