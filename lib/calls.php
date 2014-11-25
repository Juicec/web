<?
	class Calls extends view {
		
		public function my_first_api(){
			$this->return_json($_SESSION);
		}
	}
?>