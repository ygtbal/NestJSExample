// TypeORM için gerekli konfigürasyon tipini içe aktarır
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// TypeORM için gerekli DataSourceOptions tipini içe aktarır
import { DataSourceOptions } from 'typeorm';

// .env dosyasını okuyabilmek için dotenv'i içe aktarır
import * as dotenv from 'dotenv';

// .env dosyasını projeye yükler
dotenv.config();

class ConfigService {
  // Ortam değişkenlerini saklar (örneğin process.env)
  constructor(private env: { [k: string]: string | undefined }) {}

  // Ortam değişkenini getirir, eksikse ve throwOnMissing true ise hata fırlatır
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value || '';
  }

  // Gerekli tüm ortam değişkenlerinin tanımlı olup olmadığını kontrol eder
  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  // Uygulamanın çalışacağı portu döner
  public getPort() {
    return this.getValue('PORT', true);
  }

  // Uygulamanın production ortamında olup olmadığını kontrol eder
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  // TypeORM konfigürasyon ayarlarını döner
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres', // Kullanılan veritabanı türü

      host: this.getValue('POSTGRES_HOST'), // Veritabanı host adresi
      port: parseInt(this.getValue('POSTGRES_PORT')), // Port numarası
      username: this.getValue('POSTGRES_USER'), // Kullanıcı adı
      password: this.getValue('POSTGRES_PASSWORD'), // Şifre
      database: this.getValue('POSTGRES_DB'), // Veritabanı ismi

      // Entity dosyalarının yolu (TypeORM otomatik tanır)
      entities: ['**/*.entity{.ts,.js}'],

      // Migration geçmişi saklanacak tablo adı
      migrationsTableName: 'migration',

      // Migration dosyalarının bulunduğu dizin
      migrations: ['src/migration/*.ts'],

      // Production ortamında SSL bağlantısını zorunlu kılar
      ssl: this.isProduction(),
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),

      entities: ['dist/**/*.entity{.ts,.js}'], // build edilmiş halini kullan
      migrations: ['dist/migration/*.js'], // build edilmiş migrationlar
      migrationsTableName: 'migration',

      ssl: this.isProduction(),
    };
  }
}

// ConfigService sınıfı örneği oluşturulur ve gerekli environment değişkenleri kontrol edilir
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
]);

// Dışa aktarılır, başka dosyalarda kullanılabilir
export { configService };
