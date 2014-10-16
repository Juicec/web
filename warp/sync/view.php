<?
	class View {
	
		public $page_list = null;
		public $header = true;
		public $footer = true;
		
		function __construct() { 
			$page_array = get_class_methods('Pages');
			$view_array = get_class_methods('View');
			$this->page_list = array_map('strtolower',array_diff($page_array, $view_array));
		}
		
		function get_file_content($f_path){
			ob_start();
			include $f_path;
			return ob_get_clean();
		}
	
		public function generate_page($page_name){
			$_PG = new Pages();
			if (in_array(strtolower($page_name), $this->page_list)) $_PG->$page_name();
			elseif (empty($page_name)) $_PG->home();
			else{
				$this->header = false; $this->footer = false;
				$this->make_page('error/404');
				$this->header = true; $this->footer = true;
			}
		}
		
		public function make_page($name){
			if ($this->header) echo $this->get_file_content(SiteData::$mod_tmpls.'header.php');
			echo $this->get_file_content(SiteData::$tmpls.$name.'.php');
			if ($this->footer) echo $this->get_file_content(SiteData::$mod_tmpls.'footer.php');
		}
	}
?>