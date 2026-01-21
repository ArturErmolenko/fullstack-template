import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const userRepository = this.dataSource.getRepository(User);

    // Перевіряємо, чи є вже користувачі
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // Створюємо тестових користувачів
    const users = [
      userRepository.create({
        name: 'Іван Іванов',
        email: 'ivan@example.com',
      }),
      userRepository.create({
        name: 'Марія Петрова',
        email: 'maria@example.com',
      }),
      userRepository.create({
        name: 'Олексій Сидоров',
        email: 'alex@example.com',
      }),
    ];

    await userRepository.save(users);
    console.log('Database seeded successfully with test data!');
  }
}
