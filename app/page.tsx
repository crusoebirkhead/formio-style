'use client';

/**
 * Form.io Theme Test Page
 *
 * Renders static Form.io HTML structure to preview formio-theme.css styling.
 * Does NOT require react-formiojs to be installed — all markup is hand-authored
 * to match what Form.io's standard template generates at runtime.
 *
 * When Form.io is installed, replace the static markup sections with:
 *   import { Form } from 'react-formiojs';
 *   <Form form={schema} options={{ template: 'tailwind' }} />
 */

import { useState, useRef, useEffect } from 'react';
import '../formio-theme.css';

function DropdownSelect({
  label,
  options,
  defaultValue = '',
  placeholder = 'Select…',
  helpText,
  style,
}: {
  label: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
  helpText?: string;
  style?: React.CSSProperties;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className={`formio-component formio-component-select${value ? ' formio-modified' : ''}`} style={style}>
      <label className="col-form-label" style={open ? { color: 'var(--fio-primary)' } : undefined}>{label}</label>
      <div ref={ref} className={`choices form-group formio-choices${open ? ' is-open' : ''}`} data-type="select-one">
        <div className="choices__inner" onClick={() => setOpen((o) => !o)}>
          <div className="choices__list choices__list--single">
            <div className={`choices__item choices__item--selectable${!value ? ' choices__placeholder' : ''}`}>
              {value || placeholder}
            </div>
          </div>
        </div>
        <div className="choices__list choices__list--dropdown" aria-expanded={open}>
          {options.map((opt) => (
            <div
              key={opt}
              className={`choices__item choices__item--choice choices__item--selectable${opt === value ? ' is-selected' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setValue(opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
      {helpText && <p className="help-block">{helpText}</p>}
    </div>
  );
}

export default function FormTestPage() {
  return (
    <div style={{ padding: '40px', background: '#eef2f7', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, color: '#32383f', marginBottom: 4 }}>
            Form.io Theme Preview
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6f757c', margin: 0 }}>
            Static render of Form.io HTML structure with <code>formio-theme.css</code>
          </p>
        </div>

        {/* ================================================================
            FORM CONTAINER (Question Card)
        ================================================================ */}
        <div className="formio-form">
          <div className="formio-component-form">

            {/* ── Section: Text Inputs ── */}
            <div style={{ marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Text &amp; Number Inputs
              </h2>
            </div>

            {/* Text field — default */}
            <div className="formio-component formio-component-textfield">
              <label className="col-form-label" htmlFor="tf-first-name">First Name</label>
              <div className="input-group">
                <input
                  id="tf-first-name"
                  type="text"
                  className="form-control"
                  placeholder=" "
                />
              </div>
            </div>

            {/* Text field — with value */}
            <div className="formio-component formio-component-textfield">
              <label className="col-form-label" htmlFor="tf-last-name">Last Name</label>
              <div className="input-group">
                <input
                  id="tf-last-name"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  defaultValue="Smith"
                />
              </div>
            </div>

            {/* Text field — with helper text */}
            <div className="formio-component formio-component-textfield">
              <label className="col-form-label" htmlFor="tf-email">Email Address</label>
              <div className="input-group">
                <input
                  id="tf-email"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  defaultValue="jsmith@example.com"
                />
              </div>
              <p className="help-block">Must match your registered account email</p>
            </div>

            {/* Number input */}
            <div className="formio-component formio-component-number">
              <label className="col-form-label" htmlFor="tf-age">Age</label>
              <div className="input-group">
                <input
                  id="tf-age"
                  type="number"
                  className="form-control"
                  placeholder=" "
                  defaultValue={34}
                />
              </div>
            </div>

            {/* Text field — disabled */}
            <div className="formio-component formio-component-textfield">
              <label className="col-form-label" htmlFor="tf-id">Member ID (read-only)</label>
              <div className="input-group">
                <input
                  id="tf-id"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  defaultValue="MBR-00293847"
                  disabled
                />
              </div>
            </div>

            {/* Text field — error state */}
            <div className="formio-component formio-component-textfield has-error">
              <label className="col-form-label" htmlFor="tf-dob">Date of Birth</label>
              <div className="input-group">
                <input
                  id="tf-dob"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  defaultValue="13/40/1990"
                />
              </div>
              <p className="error">Please enter a valid date (MM/DD/YYYY)</p>
            </div>

            {/* ── Section: Textarea ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Textarea
              </h2>
            </div>

            <div className="formio-component formio-component-textarea">
              <label className="col-form-label" htmlFor="tf-notes">Additional Notes</label>
              <div className="input-group">
                <textarea
                  id="tf-notes"
                  className="form-control"
                  placeholder=" "
                  rows={4}
                  defaultValue="Member reports increased discomfort in the lower back region following physical therapy on 03/28. Follow-up scheduled with Dr. Ramirez."
                />
              </div>
              <p className="help-block">Provide any relevant clinical observations</p>
            </div>

            {/* ── Section: Select ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Select / Dropdown
              </h2>
            </div>

            {/* Select — with value */}
            <DropdownSelect
              label="Breathing Status"
              options={['Normal / Unlabored', 'Shallow', 'Labored', 'Labored and requires oxygen PRN', 'Requires supplemental oxygen at all times', 'Mechanically ventilated']}
              defaultValue="Labored and requires oxygen PRN"
            />

            {/* Select — empty (placeholder shown) */}
            <DropdownSelect
              label="Spinal Condition"
              options={['None', 'Scoliosis', 'Thoracic Kyphosis', 'Lumbar Lordosis', 'Cervical Kyphosis', 'Pelvic Tilt', 'Degenerative Disc Disease', 'Herniated Disc', 'Spinal Stenosis']}
              placeholder="Select all that apply"
              helpText="Select all that apply"
            />

            {/* ── Section: Radio ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Radio Buttons
              </h2>
            </div>

            <div className="formio-component formio-component-radio">
              <label className="col-form-label">Was the member seen out of bed?</label>
              <div className="form-radio radio">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="out-of-bed"
                    id="oob-yes"
                    value="yes"
                  />
                  <label className="form-check-label" htmlFor="oob-yes">Yes</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="out-of-bed"
                    id="oob-no"
                    value="no"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="oob-no">No</label>
                </div>
              </div>
            </div>

            <div className="formio-component formio-component-radio">
              <label className="col-form-label">Mobility Level</label>
              <div className="form-radio radio">
                {['Independent', 'Supervised', 'Limited Assist', 'Total Assist'].map((opt) => (
                  <div className="form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mobility"
                      id={`mob-${opt}`}
                      value={opt}
                      defaultChecked={opt === 'Supervised'}
                    />
                    <label className="form-check-label" htmlFor={`mob-${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section: Checkboxes ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Checkboxes
              </h2>
            </div>

            <div className="formio-component formio-component-selectboxes">
              <label className="col-form-label">Active Diagnoses (select all that apply)</label>
              {[
                { id: 'dx-htn', label: 'Hypertension', checked: true },
                { id: 'dx-dm2', label: 'Type 2 Diabetes', checked: true },
                { id: 'dx-chf', label: 'Congestive Heart Failure', checked: false },
                { id: 'dx-copd', label: 'COPD', checked: false },
              ].map(({ id, label, checked }) => (
                <div className="form-check" key={id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    defaultChecked={checked}
                  />
                  <label className="form-check-label" htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>

            {/* ── Section: DateTime ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Date / Time
              </h2>
            </div>

            <div className="formio-component formio-component-datetime">
              <label className="col-form-label" htmlFor="tf-visit-date">Visit Date</label>
              <div className="input-group">
                <input
                  id="tf-visit-date"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  defaultValue="03/28/2026"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* ── Section: File Upload ── */}
            {/* <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                File Upload
              </h2>
            </div> */}

            {/* <div className="formio-component formio-component-file">
              <label className="col-form-label">Supporting Documents</label>
              <div className="fileSelector">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
                Drop files to attach, or&nbsp;<a href="#">browse</a>
              </div>
              <ul className="list-group" style={{ marginTop: 8 }}>
                <li className="list-group-item">
                  <div style={{ width: 50, height: 41, background: '#dadcde', borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f757c" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  member-out-of-bed.png
                </li>
              </ul>
            </div> */}

            {/* ── Section: Alerts ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Alerts / Validation Messages
              </h2>
            </div>

            <div className="alert alert-success">Form submitted successfully.</div>
            <div className="alert alert-danger">Please correct the errors above before submitting.</div>
            <div className="alert alert-warning">This form will auto-save in 2 minutes.</div>
            <div className="alert alert-info">All fields marked with * are required.</div>

            {/* ── Section: Panel ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Panel (Card Section)
              </h2>
            </div>

            <div className="formio-component formio-component-panel">
              <div className="card border">
                <div className="card-header">
                  <h3 className="card-title">Vitals Assessment</h3>
                </div>
                <div className="card-body">
                  <div className="formio-component formio-component-number">
                    <label className="col-form-label" htmlFor="pnl-bp-s">Systolic BP</label>
                    <div className="input-group">
                      <input id="pnl-bp-s" type="number" className="form-control" placeholder=" " defaultValue={120} />
                    </div>
                  </div>
                  <div className="formio-component formio-component-number">
                    <label className="col-form-label" htmlFor="pnl-bp-d">Diastolic BP</label>
                    <div className="input-group">
                      <input id="pnl-bp-d" type="number" className="form-control" placeholder=" " defaultValue={78} />
                    </div>
                  </div>
                  <div className="formio-component formio-component-number">
                    <label className="col-form-label" htmlFor="pnl-hr">Heart Rate (bpm)</label>
                    <div className="input-group">
                      <input id="pnl-hr" type="number" className="form-control" placeholder=" " defaultValue={72} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section: Buttons ── */}
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6f757c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Buttons
              </h2>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-primary">Submit</button>
              <button className="btn btn-secondary">Save Draft</button>
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-success">Approve</button>
              <button className="btn btn-warning">Flag</button>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </div>

            {/* ── Wizard nav (bottom of form) ── */}
            <div className="formio-wizard-nav-container" style={{ marginTop: 24 }}>
              <button className="btn btn-secondary">Previous</button>
              <button className="btn btn-primary">Next</button>
            </div>

          </div>
        </div>

      
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 600, color: '#32383f', marginBottom: 4 }}>
              General Health Section
            </h2>
          </div>

          <div className="formio-form">
            <div className="formio-component-form" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* ── 1. Height — split ft / in ── */}
              <div style={{ borderBottom: '1px solid #f5f9fc', paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 0 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#6f757c', lineHeight: 1.3 }}>
                  Height
                </div>
                {/* Split input: two inputs share a joined border */}
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* ft */}
                  <div className="formio-component formio-component-number" style={{ flex: 1, position: 'relative', paddingTop: 0, paddingBottom: 0, borderBottom: 'none' }}>
                    <label className="col-form-label" htmlFor="rec-ft">ft</label>
                    <div className="input-group">
                      <input
                        id="rec-ft"
                        type="number"
                        className="form-control"
                        placeholder=" "
                        defaultValue={6}
                      />
                    </div>
                  </div>
                  {/* in */}
                  <div className="formio-component formio-component-number" style={{ flex: 1, position: 'relative', paddingTop: 0, paddingBottom: 0, borderBottom: 'none' }}>
                    <label className="col-form-label" htmlFor="rec-in">in</label>
                    <div className="input-group">
                      <input
                        id="rec-in"
                        type="number"
                        className="form-control"
                        placeholder=" "
                        defaultValue={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 2. O2 Saturation — two full-width stacked inputs ── */}
              <div style={{ borderBottom: '1px solid #f5f9fc', paddingBottom: 20, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#6f757c', lineHeight: 1.3 }}>
                  O2 Saturation
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="formio-component formio-component-number" style={{ flex: 1, position: 'relative', paddingTop: 0, paddingBottom: 0, borderBottom: 'none' }}>
                    <label className="col-form-label" htmlFor="rec-rest">Rest %</label>
                    <div className="input-group">
                      <input id="rec-rest" type="number" className="form-control" placeholder=" " defaultValue={85} />
                    </div>
                  </div>
                  <div className="formio-component formio-component-number" style={{ flex: 1, position: 'relative', paddingTop: 0, paddingBottom: 0, borderBottom: 'none' }}>
                    <label className="col-form-label" htmlFor="rec-active">Active %</label>
                    <div className="input-group">
                      <input id="rec-active" type="number" className="form-control" placeholder=" " defaultValue={75} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 3. Respiration — select + indented sub-field ── */}
              <div style={{ borderBottom: '1px solid #f5f9fc', paddingBottom: 20, paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Menu selector */}
                <DropdownSelect
                  label="Respiration"
                  options={['Normal / Unlabored', 'Shallow', 'Labored', 'Labored and requires oxygen PRN', 'Requires supplemental oxygen at all times', 'Mechanically ventilated']}
                  defaultValue="Labored and requires oxygen PRN"
                  style={{ maxWidth: 420 }}
                />

                {/* Indented sub-field */}
                <div style={{ borderLeft: '1px solid #dadcde', paddingLeft: 16, paddingTop: 12, paddingBottom: 12 }}>
                  <div className="formio-component formio-component-number" style={{ maxWidth: 204, position: 'relative' }}>
                    <label className="col-form-label" htmlFor="rec-o2">Oxygen (L/min)</label>
                    <div className="input-group">
                      <input id="rec-o2" type="number" className="form-control" placeholder=" " defaultValue={2} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 4. Postural Asymmetries — select + multiple sub-fields ── */}
              <div style={{ borderBottom: '1px solid #f5f9fc', paddingBottom: 20, paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Menu selector */}
                <DropdownSelect
                  label="Postural Asymmetries"
                  options={['None', 'Scoliosis', 'Thoracic Kyphosis', 'Lumbar Lordosis', 'Cervical Kyphosis', 'Pelvic Tilt', 'Forward Head Posture', 'Leg Length Discrepancy']}
                  defaultValue="Scoliosis; Thoracic Kyphosis"
                  helpText="Select all that apply"
                  style={{ maxWidth: 420 }}
                />

                {/* Indented sub-fields */}
                <div style={{ borderLeft: '1px solid #dadcde', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* Textarea: Please describe */}
                  <div className="formio-component formio-component-textarea" style={{ position: 'relative' }}>
                    <label className="col-form-label" htmlFor="rec-describe">Please describe</label>
                    <div className="input-group">
                      <textarea
                        id="rec-describe"
                        className="form-control"
                        placeholder=" "
                        rows={4}
                        defaultValue="Lorem ipsum dolor sit amet consectetur. Suspendisse sed tortor est commodo est maecenas lorem tortor. Aliquet tortor vulputate fames ut euismod volutpat velit euismod sed. Porta nunc vel id tortor."
                      />
                    </div>
                  </div>

                  {/* Text field: Are marked deficits fixed or flexible? */}
                  <div className="formio-component formio-component-textfield" style={{ position: 'relative' }}>
                    <label className="col-form-label" htmlFor="rec-deficits">Are marked deficits fixed or flexible?</label>
                    <div className="input-group">
                      <input
                        id="rec-deficits"
                        type="text"
                        className="form-control"
                        placeholder=" "
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      />
                    </div>
                  </div>

                  {/* Radio: Was the member seen out of bed? */}
                  <div className="formio-component formio-component-radio">
                    <label className="col-form-label">Was the member seen out of bed?</label>
                    <div className="form-radio radio">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="rec-oob" id="rec-oob-yes" value="yes" />
                        <label className="form-check-label" htmlFor="rec-oob-yes">Yes</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="rec-oob" id="rec-oob-no" value="no" defaultChecked />
                        <label className="form-check-label" htmlFor="rec-oob-no">No</label>
                      </div>
                    </div>
                  </div>

                  {/* Indented Why? sub-field */}
                  <div style={{ borderLeft: '1px solid #dadcde', paddingLeft: 16, paddingTop: 12, paddingBottom: 12 }}>
                    <div className="formio-component formio-component-textfield" style={{ position: 'relative' }}>
                      <label className="col-form-label" htmlFor="rec-why">Why?</label>
                      <div className="input-group">
                        <input
                          id="rec-why"
                          type="text"
                          className="form-control"
                          placeholder=" "
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Media button */}
                  <button className="btn btn-outlined" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1894e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Upload Media
                  </button>

                </div>
              </div>

              {/* ── 5. Additional Info — large textarea ── */}
              <div style={{ paddingTop: 4 }}>
                <div className="formio-component formio-component-textarea" style={{ position: 'relative' }}>
                  <label className="col-form-label" htmlFor="rec-addl">Additional Info</label>
                  <div className="input-group">
                    <textarea
                      id="rec-addl"
                      className="form-control"
                      placeholder=" "
                      rows={5}
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
