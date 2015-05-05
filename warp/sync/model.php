<?
	class DB {
		
		private static $_instance;
		
		public static function getInstance() {
			if (self::$_instance === null) {
				try {
					self::$_instance = new DB();
				} catch (PDOException $e) {
					die('Подключение не удалось: ' . $e->getMessage());
				}
			}
	 
			return self::$_instance;
		}
		
		function __construct() {
			try {
				$dsn = 'mysql:dbname='.SiteData::$db_name.';host='.SiteData::$db_ip;
				$this->db = new PDO($dsn, SiteData::$db_user, SiteData::get_db_pw());
				$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (PDOException $e) {
				die('Подключение не удалось: ' . $e->getMessage());
			}
		}
		
		function query($sql_query, $params){
			$query = $this->db->prepare($sql_query);
			$query->execute($params);
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		
		public function insert($sql_query, $params){
			try {
				$query = $this->db->prepare($sql_query);
				if($query->execute($params)){
					return $this->db->lastInsertId();
				}
			} 
			catch (PDOException $e){
				var_dump($e->getMessage());
			}
		}
		
		public function execute($sql_query, $params=null) {
			try {
				$q = $this->db->prepare($sql_query);

				if (is_array($params)) {
					$res = $q->execute($params);
				} else {
					$res = $q->execute();
				}
			} catch (PDOException $e) {
				var_dump($e->getMessage());
				return false;
			}
		}
	}
?>