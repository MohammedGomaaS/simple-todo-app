interface Task {
    text: string;
    done: boolean;
    date: string;
  }
  interface LastRemovedTask{
    index: number;
    task: Task;
    timeoutRefrence?: any
  };