<?
	class View {
	
		public $page_list = null;
		public $api_page_list = null;
		public $header = true;
		public $footer = true;
		
		function __construct() { 
			$page_array = get_class_methods('Pages');
			$view_array = get_class_methods('View');
			$calls_array = get_class_methods('Calls');
			$this->page_list = array_map('strtolower',array_diff($page_array, $view_array));
			$this->api_page_list = array_map('strtolower',array_diff($calls_array, $view_array));
		}
		
		function get_file_content($f_path){
			ob_start();
			include $f_path;
			return ob_get_clean();
		}
	
		public function generate_page($page_name){
			$_PG = new Pages();
			if (in_array(strtolower($page_name[0]), $this->page_list)) $_PG->$page_name[0]();
			elseif (strtolower($page_name[0]) == 'api'){
				$route = explode('?', trim($page_name[1], '?'));
				if (in_array(strtolower($route[0]), $this->api_page_list)){
					$_CALLS = new Calls();
					$_CALLS->$route[0]();
				}
			}
			elseif (empty($page_name[0])) $_PG->home();
			else{
				$this->make_page('home');
			}
		}
		
		public function make_page($name){
			if ($this->header) echo $this->get_file_content(SiteData::$mod_tmpls.'header.php');
			echo $this->get_file_content(SiteData::$tmpls.$name.'.php');
			if ($this->footer) echo $this->get_file_content(SiteData::$mod_tmpls.'footer.php');
		}
		
		public function return_json($array){
			header("Content-Type: text/plain");
			echo json_encode($array);
			die;
		}

		public function return_error($array){
			header("Content-Type: text/plain");
			echo json_encode(array('error_text' => 'test'));
			die;
		}
	}
?>