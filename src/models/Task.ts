//imports

import TaskTag from './TaskTag'
import Assignee from './Assignee';

interface Task {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    priority: 'low' | 'medium' | 'high';
    progress: number;
    status: 'todo' | 'in-progress' | 'review' | 'completed';
    taskCompleted: boolean;
    tags: TaskTag[];
    assignees: Assignee[];

}

export default Task;