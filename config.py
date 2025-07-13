class BaseConfig:
    DB_PATH = 'db/forum.db'
    SECRET_KEY = 'demo-secret-key'
    DEBUG = False
    ENV = 'production'

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    ENV = 'development'

class ProductionConfig(BaseConfig):
    DEBUG = False
    ENV = 'production'

class TestingConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    ENV = 'testing'
