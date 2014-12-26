<?
class Tools {
    protected static $_instance;

    private function __construct() {        
    }

    public static function getInstance() {
        if (self::$_instance === null) {
            self::$_instance = new self;   
        }
 
        return self::$_instance;
    }
  
    private function __clone() {
    }

    private function __wakeup() {
    }   
	
	
	public static function encode_user_id($user_id){
		return base64_encode($user_id);
	}
	
	public static function decode_user_id($user_id){
		return base64_decode($user_id);
	}
}

Tools::getInstance();
?>