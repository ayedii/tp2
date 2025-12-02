import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: this.fb.control('', { validators: [Validators.required, Validators.minLength(4)], nonNullable: true }),
  });

  readonly showFormError = signal(false);

  submit() {
    if (this.form.invalid) {
      this.showFormError.set(true);
      return;
    }
    this.showFormError.set(false);
  }
}
