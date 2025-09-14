import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '@app/components/interfaces/users.interface';
import { Subject, Subscription } from 'rxjs';
import { LogErrorsService } from '../../services/log-errors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-log-errors',
    templateUrl: './log-errors.component.html',
    styleUrls: ['./log-errors.component.css'],
    standalone: false
})
export class LogErrorsComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['id', 'fecha', 'error', 'description'];
    dataSource = new MatTableDataSource();
    private destroy$ = new Subject<any>();
    roles!: any[];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    timeInterval!: Subscription;
    user!: IUser;
    id: number = 0;
    email: string = ""
    userName: string = ""
    rol: string = ""
    passwordApp: string = ""
    stateSession: string = ""
    idRol: number = 0;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    constructor(private LogErrorsSVC: LogErrorsService,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) { }

      form!: FormGroup;

    ngOnInit(): void {
        this.getLogError();
    }

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
        this.timeInterval?.unsubscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private getLogError(): void {
        this.LogErrorsSVC.getAll().subscribe(res => {
            this.dataSource.data = res;
        });
    }

    getElement(id: number) {
        this.LogErrorsSVC.getById(id).subscribe(res => {
            this.form.patchValue(res);
        })
    }
}
