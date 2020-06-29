import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public myForm: FormGroup;
  public lastRemovedTask: LastRemovedTask;
  @ViewChild('tasksContainer', { static: false }) private tasksContainer: ElementRef;
  private tasks: Task[] = [
    { text: 'Buy new Sweetshirt', date: new Date().toISOString(), done: true },
    { text: 'Begin promotional phase', date: new Date().toISOString(), done: false },
    { text: 'Read an article', date: new Date().toISOString(), done: false },
    { text: 'Try not to fall a sleep', date: new Date().toISOString(), done: false },
    { text: "Watch 'Sherlock'", date: new Date().toISOString(), done: false },
    { text: 'Begin QA for the product', date: new Date().toISOString(), done: false },
    { text: 'Go for a walk', date: new Date().toISOString(), done: false },
    { text: 'Buy new Sweetshirt', date: new Date().toISOString(), done: true },
    { text: 'Begin promotional phase', date: new Date().toISOString(), done: false },
    { text: 'Read an article', date: new Date().toISOString(), done: false },
    { text: 'Try not to fall a sleep', date: new Date().toISOString(), done: false },
    { text: "Watch 'Sherlock'", date: new Date().toISOString(), done: false },
    { text: 'Begin QA for the product', date: new Date().toISOString(), done: false },
    { text: 'Go for a walk', date: new Date().toISOString(), done: false }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.initExistedTasks();
  }

  createFormGroup(): void {
    this.myForm = this.formBuilder.group({
      tasks: this.formBuilder.array([]),
    });
  }

  initExistedTasks(): void {
    this.tasks.forEach(task => {
      this.addTask(task, false);
    });
  }

  addTask(task: Task = { text: 'My task', date: new Date().toISOString(), done: false }, isScroll: boolean = true): void {
    const tasks = this.myForm.controls.tasks as FormArray;
    tasks.push(this.formBuilder.group({
      text: new FormControl(task.text, [Validators.required]),
      done: task.done,
      date: task.date
    }));
    if (isScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.tasksContainer.nativeElement.scrollTop = this.tasksContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  removeTask(index) {
    this.lastRemovedTask && clearTimeout(this.lastRemovedTask.timeoutRefrence);

    const tasks = this.myForm.controls.tasks as FormArray;
    this.lastRemovedTask = {
      index,
      task: tasks.at(index).value
    }
    tasks.removeAt(index)
    this.lastRemovedTask.timeoutRefrence = setTimeout(() => {
      this.lastRemovedTask = null;
    }, 5000);
  }

  undoRemoveingTask() {
    const tasks = this.myForm.controls.tasks as FormArray;
    if (this.lastRemovedTask.index < tasks.length) {
      tasks.insert(this.lastRemovedTask.index, this.formBuilder.group({
        text: new FormControl(this.lastRemovedTask.task.text),
        done: this.lastRemovedTask.task.done,
        date: this.lastRemovedTask.task.date
      }));
    } else {
      this.addTask(this.lastRemovedTask.task)
    }
    this.lastRemovedTask && clearTimeout(this.lastRemovedTask.timeoutRefrence);
    this.lastRemovedTask = null;
  }
}
