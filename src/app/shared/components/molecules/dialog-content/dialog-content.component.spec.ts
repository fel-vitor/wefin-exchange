import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeDialogContentComponent } from '@testing/mocks/fake-dialog-content.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogContentComponent } from './dialog-content.component';

describe('DialogContentComponent', () => {
  let fixture: ComponentFixture<DialogContentComponent>;
  let testHelper: TestHelper<DialogContentComponent>;
  let dialogRefSpy: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefSpy = { close: jest.fn() };

    TestBed.configureTestingModule({
      imports: [DialogContentComponent],
      providers: [{ provide: DynamicDialogRef, useValue: dialogRefSpy }],
    });

    TestBed.compileComponents();

    TestBed.overrideComponent(DialogContentComponent, {
      remove: {
        imports: [DialogContentComponent],
      },
      add: {
        imports: [FakeDialogContentComponent],
      },
    });

    fixture = TestBed.createComponent(DialogContentComponent);

    testHelper = new TestHelper(fixture);

    fixture.detectChanges();
  });

  it('Deve exibir header, content e footer quando os inputs são verdadeiros', () => {
    fixture.componentRef.setInput('displayHeader', true);
    fixture.componentRef.setInput('displayContent', true);
    fixture.componentRef.setInput('displayFooter', true);

    fixture.detectChanges();

    const headerDebugEl = testHelper.queryByTestId('header-dialog-content');
    const contentDebugEl = testHelper.queryByTestId('content-dialog-content');
    const footerDebugEl = testHelper.queryByTestId('footer-dialog-content');

    expect(headerDebugEl).toBeTruthy();
    expect(contentDebugEl).toBeTruthy();
    expect(footerDebugEl).toBeTruthy();
  });

  it('Não deve exibir o header quando displayHeader é falso', () => {
    fixture.componentRef.setInput('displayHeader', false);
    fixture.detectChanges();

    const headerDebugEl = testHelper.queryByTestId('header-dialog-content');

    expect(headerDebugEl).toBeFalsy();
  });

  it('Não deve exibir o content quando displayContent é falso', () => {
    fixture.componentRef.setInput('displayContent', false);
    fixture.detectChanges();

    const contentDebugEl = testHelper.queryByTestId('content-dialog-content');
    expect(contentDebugEl).toBeFalsy();
  });

  it('Não deve exibir o content quando displayContent é falso', () => {
    fixture.componentRef.setInput('displayContent', false);
    fixture.detectChanges();

    const contentDebugEl = testHelper.queryByTestId('content-dialog-content');
    expect(contentDebugEl).toBeFalsy();
  });

  it('Não deve exibir o footer quando displayFooter é falso', () => {
    fixture.componentRef.setInput('displayFooter', false);
    fixture.detectChanges();

    const footerDebugEl = testHelper.queryByTestId('footer-dialog-content');
    expect(footerDebugEl).toBeFalsy();
  });

  it('Deve exibir o botão de fechar quando showCloseButton é true', () => {
    fixture.componentRef.setInput('showCloseButton', true);
    fixture.detectChanges();

    const closeButtonDebugEl = testHelper.queryByTestId('button-close-action');
    expect(closeButtonDebugEl).toBeTruthy();
  });

  it('Não deve exibir o botão de fechar quando showCloseButton é false', () => {
    fixture.componentRef.setInput('showCloseButton', false);
    fixture.detectChanges();

    const closeButtonDebugEl = testHelper.queryByTestId('button-close-action');
    expect(closeButtonDebugEl).toBeFalsy();
  });

  it('Deve chamar closeDialog() e dialogRef.close() quando clicar no botão de fechar', () => {
    fixture.componentRef.setInput('showCloseButton', true);
    fixture.detectChanges();

    testHelper.click('button-close-action');

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
