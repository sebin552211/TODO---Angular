import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf, NgFor } from '@angular/common';
import { TodoItem } from '../Interface/TodoItem';
 
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatTableModule, NgIf, NgFor],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  displayedColumns: string[] = ['task', 'completed', 'actions'];
  dataSource = new MatTableDataSource<TodoItem>();
  newTask: string = '';
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;
  editingTask: TodoItem | null = null; // Task currently being edited
 
  constructor() { }
 
  ngOnInit(): void {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      this.dataSource.data = JSON.parse(storedTodoList);
    }
  }
 
  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      const updatedTodoList = [...this.dataSource.data, newTodoItem];
      this.dataSource.data = updatedTodoList;
      this.todoInputRef.nativeElement.value = '';
      this.saveTodoList();
    }
  }
 
  deleteTask(id: number): void {
    const updatedTodoList = this.dataSource.data.filter(item => item.id !== id);
    this.dataSource.data = updatedTodoList;
    this.saveTodoList();
  }
 
  toggleCompleted(id: number): void {
    const updatedTodoList = this.dataSource.data.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    this.dataSource.data = updatedTodoList;
    this.saveTodoList();
  }
 
  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.dataSource.data));
  }
}