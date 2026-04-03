import React, { useState } from 'react';
import { categoryOptions } from '../data/articles';
import Button from './Button';

const initialFormState = {
  title: '',
  description: '',
  category: '',
  tags: '',
  status: 'draft',
};

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Article creation form component
 * @param {Object} props
 * @param {function} props.onClose - callback to close the parent modal
 * @param {function} props.onSubmit - callback when form is submitted
 */
const Form = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 20) newErrors.description = 'Description must be at least 20 characters';
    if (!formData.category) newErrors.category = 'Please select a category';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Show success state
    setSubmitted(true);
    onSubmit?.(formData);

    setTimeout(() => {
      setSubmitted(false);
      setFormData(initialFormState);
      setErrors({});
      onClose();
    }, 1500);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 animate-scale-in">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Article Created!</h3>
        <p className="text-sm text-slate-500 text-center">
          Your article has been saved as a {formData.status === 'draft' ? 'draft' : 'published article'}.
        </p>
      </div>
    );
  }

  return (
    <form id="create-article-form" onSubmit={handleSubmit} noValidate>
      <div className="px-6 py-5 space-y-5">
        {/* Title field */}
        <div>
          <label htmlFor="form-title" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Article Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="form-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g. How to set up two-factor authentication"
            className={`input-field ${errors.title ? 'border-rose-400 ring-2 ring-rose-100 focus:ring-rose-200 focus:border-rose-400' : ''}`}
          />
          {errors.title && (
            <p id="form-title-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description field */}
        <div>
          <label htmlFor="form-description" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="form-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a clear summary of what this article covers..."
            rows={4}
            className={`input-field resize-none ${errors.description ? 'border-rose-400 ring-2 ring-rose-100 focus:ring-rose-200 focus:border-rose-400' : ''}`}
          />
          <div className="flex justify-between mt-1">
            {errors.description ? (
              <p id="form-description-error" className="text-xs text-rose-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.description}
              </p>
            ) : <span />}
            <span className={`text-[11px] ${formData.description.length > 500 ? 'text-rose-400' : 'text-slate-400'}`}>
              {formData.description.length}/500
            </span>
          </div>
        </div>

        {/* Category field */}
        <div>
          <label htmlFor="form-category" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="form-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`input-field ${errors.category ? 'border-rose-400 ring-2 ring-rose-100 focus:ring-rose-200 focus:border-rose-400' : ''}`}
          >
            <option value="">Select a category...</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="form-category-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.category}
            </p>
          )}
        </div>

        {/* Tags field (optional) */}
        <div>
          <label htmlFor="form-tags" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Tags{' '}
            <span className="text-slate-400 font-normal text-xs">(optional, comma-separated)</span>
          </label>
          <input
            id="form-tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="E.g. setup, authentication, security"
            className="input-field"
          />
        </div>

        {/* Status toggle */}
        <div>
          <p className="block text-sm font-semibold text-slate-700 mb-2">Publish Status</p>
          <div className="flex gap-3">
            {['draft', 'published'].map((status) => (
              <label
                key={status}
                htmlFor={`status-${status}`}
                className={`
                  flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer
                  transition-all duration-200
                  ${
                    formData.status === status
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                  }
                `}
              >
                <input
                  type="radio"
                  id={`status-${status}`}
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    formData.status === status ? 'border-primary' : 'border-slate-300'
                  }`}
                >
                  {formData.status === status && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </span>
                <span className="text-sm font-medium capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Modal footer */}
      <div className="flex items-center justify-between gap-3 px-6 py-4 bg-slate-50 rounded-b-3xl border-t border-slate-100">
        <p className="text-xs text-slate-400">
          <span className="text-rose-400">*</span> Required fields
        </p>
        <div className="flex items-center gap-3">
          <Button
            id="form-cancel-btn"
            type="button"
            variant="secondary"
            size="md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="form-submit-btn"
            type="submit"
            variant="primary"
            size="md"
            icon={<CheckIcon />}
          >
            {formData.status === 'draft' ? 'Save Draft' : 'Publish'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
