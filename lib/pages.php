<?
	class Pages extends view {
		
		function __construct() {
			$this->db = DB::getInstance();
			$this->user = User::getInstance();
		}
	
		public function home(){
			$this->make_page('home');
		}

		public function shop(){
			$this->make_page('shop');
		}

		public function admin(){
			$this->make_page('admin');
		}

		public function test(){
			$this->sc = new ShopCart();
			$result = $this->sc->get_total(25);
			var_dump($result);
		}

		public function auth(){
			if (!empty($_POST['email']) && !empty($_POST['password'])){
				if ($this->user->auth_user($_POST['email'], $_POST['password']))
					header('Location: /home');
			}
		}
	}
?>