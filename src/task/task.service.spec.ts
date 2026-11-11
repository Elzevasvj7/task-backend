import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service.js';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a task', () => {
    const task = service.create({ title: 'Test Task', description: 'Test Description' });
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
    expect(task.completed).toBe(false);
  })
  it('should get all created tasks', () => {
    const task = service.create({ title: 'Test Task', description: 'Test Description' });
    const tasks = service.findAll();
    expect(tasks.length).toBe(1);
  })
  it('should get a task by id', () => {
    const task = service.create({ title: 'Test Task', description: 'Test Description' });
    const foundTask = service.findOne(task.id);
    expect(foundTask).toBe(task);
  })
  it('should throw NotFoundException if task does not exist', () => {
    expect(() => service.findOne(999)).toThrow('Task with id 999 not found');
  })
});

