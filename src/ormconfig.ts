import { DataSourceOptions  } from "typeorm"

const ormConfig: DataSourceOptions = ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'testuser1',
      password: 'password',
      database: 'mediumclone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      synchronize: false,
    })

export default ormConfig
