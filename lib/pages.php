<?
	class Pages extends view {
		
		function __construct() {
			$this->db = DB::getInstance();
		}
	
		public function home(){
			$this->make_page('home');
		}
	}
?>