import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AssignmentsController } from './assignments.controller';
import { TeacherScope } from '../common/teacher-scope';
import { AssignmentsService } from './assignments.service';

@Module({
  imports: [UsersModule, NotificationsModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService, TeacherScope],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
