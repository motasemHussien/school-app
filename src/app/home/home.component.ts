// Angular Core
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material UI Modules
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

// interfaces
import type { Student } from '../interfaces/student.interface';

// Components
import { StudentDetailsDialog } from '../components/student-details-dialog/student-details-dialog.component';

// Third Packages
import { last } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeComponent {
  dataSource: Student[] = [];
  showAddStudentForm: boolean = false;
  showEditStudentForm: boolean = false;
  newStudent: Student = {
    firstName: '',
    id: 0,
    lastName: '',
    year: '',
    class: '',
    image: '',
    subjects: [],
  };
  nextId: number = 1;
  filterType: string = 'primary'; // Default filter type
  selectedYear: string = '';
  selectedClass: string = '';
  allStudents: Student[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      id: 1,
      year: 'KG1',
      class: 'Class 1',
      image: 'john_doe.jpg',
      subjects: [
        { name: 'Math', grade: 'A' },
        { name: 'English', grade: 'B' },
      ],
    },
    {
      firstName: 'Alice',
      lastName: 'Smith',
      id: 2,
      year: 'KG2',
      class: 'Class 2',
      image: 'alice_smith.jpg',
      subjects: [
        { name: 'Math', grade: 'B' },
        { name: 'English', grade: 'A' },
      ],
    },
    {
      firstName: 'Mick',
      lastName: 'Jordan',
      id: 2,
      year: 'KG3',
      class: 'Class 3',
      image: 'mick_jordan.jpg',
      subjects: [
        { name: 'Physics', grade: 'B' },
        { name: 'Arabic', grade: 'A' },
      ],
    },
  ];
  years: string[] = [
    'KG1',
    'KG2',
    'KG3',
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
  ];
  classes: string[] = []; // Fill this array based on selected filter
  // dataSource: any[] = []; // Populate with students based on selected filters
  displayedColumns: string[] = ['name', 'age', 'actions']; // Columns to display in the table

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Initialize classes array based on filter type
    this.updateYears();
  }

  onFilterChange(): void {
    this.updateYears();
    this.updatedClasses();
    this.fetchStudents();
  }

  updateYears(): void {
    if (this.filterType === 'primary') {
      this.years = [
        'KG1',
        'KG2',
        'KG3',
        '1st Grade',
        '2nd Grade',
        '3rd Grade',
        '4th Grade',
        '5th Grade',
      ];
    } else if (this.filterType === 'secondary') {
      this.years = [
        '6th Grade',
        '7th Grade',
        '8th Grade',
        '9th Grade',
        '10th Grade',
        '11th Grade',
        '12th Grade',
      ];
    }
  }

  updatedClasses(): void {
    if (this.filterType === 'secondary') {
      this.classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4'];
    } else {
      const kgClasses = this.years.slice(0, 3);
      if (kgClasses.includes(this.selectedYear)) {
        this.classes = ['Class 1', 'Class 2', 'Class 3'];
      } else {
        this.classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
      }
    }
  }

  fetchStudents(): void {
    // Perform HTTP request to fetch students based on selected filters
    // Update dataSource with fetched data

    this.dataSource = this.allStudents.filter((student) => {
      return (
        student.class === this.selectedClass &&
        student.year === this.selectedYear
      );
    });
  }

  editStudent(student: Student): void {
    // Copy the student object to the newStudent property for editing
    this.newStudent = { ...student };
    this.showEditStudentForm = true; // Show the edit form
  }

  cancelEdit(): void {
    this.showEditStudentForm = false; // Hide the edit form
  }

  submitEdit(): void {
    // Find the index of the student to be edited
    const index = this.allStudents.findIndex(
      (student) => student.id === this.newStudent.id
    );
    if (index !== -1) {
      // Update the corresponding student object in the allStudents array
      this.allStudents[index] = { ...this.newStudent };
      this.fetchStudents(); // Update the dataSource array
      this.showEditStudentForm = false; // Hide the edit form
    }
  }

  deleteStudent(student: Student): void {
    // Find the index of the student to be deleted
    this.allStudents = this.allStudents.filter((s) => {
      return s.id != student.id;
    });
    this.dataSource = this.allStudents.filter((s) => {
      return s.class === this.selectedClass && s.year === this.selectedYear;
    });
  }

  addStudent(newStudent: Student): void {
    // Add the new student to the dataSource array

    this.allStudents.push(newStudent);
    this.fetchStudents();
  }

  toggleAddStudentForm(): void {
    this.showAddStudentForm = !this.showAddStudentForm;
  }
  addNewStudent(): void {
    // Assign id to the new student
    this.newStudent.id = this.nextId++;
    this.addStudent(this.newStudent);
    // Add the new student to the dataSource array

    // Reset form fields
    this.newStudent = {
      firstName: '',
      id: 0,
      lastName: '',
      year: '',
      class: '',
      image: '',
      subjects: [],
    };
    // Hide the form after adding the student

    this.showAddStudentForm = false;
    console.log('new student: ', this.newStudent);
  }
  viewStudentDetails(student: Student): void {
    // Implement logic to view student details
    console.log('Viewing student details:', student);

    this.openStudentDetailsDialog(student);
  }

  public openStudentDetailsDialog(selectedStudent: Student): void {
    this.dialog.open(StudentDetailsDialog, {
      data: selectedStudent,
    });
  }
}
