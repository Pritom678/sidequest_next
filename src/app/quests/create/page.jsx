"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateQuestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    reward: "",
    xp: 0,
    difficulty: "Easy",
    duration: "",
    category: "",
    image: "",
    status: "available",
    popularity: 0,
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    delete newErrors[name];

    switch (name) {
      case "id":
        if (!value.trim()) {
          newErrors[name] = "Quest ID is required";
        } else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          newErrors[name] =
            "Only letters, numbers, hyphens, and underscores allowed";
        }
        break;
      case "name":
        if (!value.trim()) {
          newErrors[name] = "Quest name is required";
        } else if (value.length < 3) {
          newErrors[name] = "Quest name must be at least 3 characters";
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors[name] = "Description is required";
        } else if (value.length < 10) {
          newErrors[name] = "Description must be at least 10 characters";
        }
        break;
      case "price":
      case "xp":
      case "popularity":
        if (value < 0) {
          newErrors[name] = "Value must be 0 or greater";
        }
        if (name === "popularity" && value > 100) {
          newErrors[name] = "Popularity must be between 0 and 100";
        }
        break;
      case "image":
        if (!value.trim()) {
          newErrors[name] = "Image URL is required";
        } else if (!/^https?:\/\/.+\..+/.test(value)) {
          newErrors[name] = "Please enter a valid URL";
        }
        break;
      case "category":
      case "duration":
      case "reward":
        if (!value.trim()) {
          newErrors[name] = "This field is required";
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear messages when user starts typing
    setError("");
    setSuccess("");

    // Validate field on change
    validateField(name, processedValue);
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? Number(value) : value;
    validateField(name, processedValue);
  };

  const validateForm = () => {
    const requiredFields = [
      "id",
      "name",
      "description",
      "price",
      "reward",
      "xp",
      "difficulty",
      "duration",
      "category",
      "image",
      "status",
      "popularity",
    ];
    let isValid = true;

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Quest created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/quests");
        }, 1500);
      } else {
        setError(result.error || "Failed to create quest");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">Create New Quest</h1>
            <p className="text-lg opacity-70">
              Add a new adventure to the SideQuest collection
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Basic Information */}
            <div className="card bg-base-200 p-8 space-y-6 border border-base-300">
              <h2 className="text-xl font-semibold border-b border-base-300 pb-3">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label htmlFor="quest-id" className="label">
                    <span className="label-text font-medium">Quest ID *</span>
                  </label>
                  <input
                    id="quest-id"
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.id ? "input-error" : ""
                    }`}
                    placeholder="e.g., dragon-slayer-101"
                    required
                    aria-invalid={errors.id ? "true" : "false"}
                    aria-describedby={errors.id ? "quest-id-error" : undefined}
                  />
                  {errors.id && (
                    <span
                      id="quest-id-error"
                      className="label-text-alt text-error"
                    >
                      {errors.id}
                    </span>
                  )}
                  <label className="label">
                    <span className="label-text-alt opacity-60">
                      Unique identifier for the quest
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label htmlFor="quest-name" className="label">
                    <span className="label-text font-medium">Quest Name *</span>
                  </label>
                  <input
                    id="quest-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder="e.g., Dragon Slayer"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={
                      errors.name ? "quest-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <span
                      id="quest-name-error"
                      className="label-text-alt text-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="quest-description" className="label">
                  <span className="label-text font-medium">Description *</span>
                </label>
                <textarea
                  id="quest-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`textarea textarea-bordered h-32 w-full ${
                    errors.description ? "textarea-error" : ""
                  }`}
                  placeholder="Describe the quest objectives and story..."
                  required
                  aria-invalid={errors.description ? "true" : "false"}
                  aria-describedby={
                    errors.description ? "quest-description-error" : undefined
                  }
                />
                {errors.description && (
                  <span
                    id="quest-description-error"
                    className="label-text-alt text-error"
                  >
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="quest-image" className="label">
                  <span className="label-text font-medium">Image URL *</span>
                </label>
                <input
                  id="quest-image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input input-bordered w-full ${
                    errors.image ? "input-error" : ""
                  }`}
                  placeholder="https://example.com/quest-image.jpg"
                  required
                  aria-invalid={errors.image ? "true" : "false"}
                  aria-describedby={
                    errors.image ? "quest-image-error" : undefined
                  }
                />
                {errors.image && (
                  <span
                    id="quest-image-error"
                    className="label-text-alt text-error"
                  >
                    {errors.image}
                  </span>
                )}
              </div>
            </div>

            {/* Quest Details */}
            <div className="card bg-base-200 p-8 space-y-6 border border-base-300">
              <h2 className="text-xl font-semibold border-b border-base-300 pb-3">
                Quest Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label htmlFor="quest-difficulty" className="label">
                    <span className="label-text font-medium">Difficulty *</span>
                  </label>
                  <select
                    id="quest-difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Easy">Easy</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-control">
                  <label htmlFor="quest-status" className="label">
                    <span className="label-text font-medium">Status *</span>
                  </label>
                  <select
                    id="quest-status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="locked">Locked</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-control">
                  <label htmlFor="quest-category" className="label">
                    <span className="label-text font-medium">Category *</span>
                  </label>
                  <input
                    id="quest-category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.category ? "input-error" : ""
                    }`}
                    placeholder="e.g., Adventure, Combat, Exploration"
                    required
                    aria-invalid={errors.category ? "true" : "false"}
                    aria-describedby={
                      errors.category ? "quest-category-error" : undefined
                    }
                  />
                  {errors.category && (
                    <span
                      id="quest-category-error"
                      className="label-text-alt text-error"
                    >
                      {errors.category}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="quest-duration" className="label">
                    <span className="label-text font-medium">Duration *</span>
                  </label>
                  <input
                    id="quest-duration"
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.duration ? "input-error" : ""
                    }`}
                    placeholder="e.g., 2h, 30min, 1-2 days"
                    required
                    aria-invalid={errors.duration ? "true" : "false"}
                    aria-describedby={
                      errors.duration ? "quest-duration-error" : undefined
                    }
                  />
                  {errors.duration && (
                    <span
                      id="quest-duration-error"
                      className="label-text-alt text-error"
                    >
                      {errors.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="quest-tags" className="label">
                  <span className="label-text font-medium">Tags</span>
                </label>
                <input
                  id="quest-tags"
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., adventure, combat, magic, solo"
                />
                <label className="label">
                  <span className="label-text-alt opacity-60">
                    Separate tags with commas
                  </span>
                </label>
              </div>
            </div>

            {/* Rewards & Stats */}
            <div className="card bg-base-200 p-8 space-y-6 border border-base-300">
              <h2 className="text-xl font-semibold border-b border-base-300 pb-3">
                Rewards & Stats
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label htmlFor="quest-price" className="label">
                    <span className="label-text font-medium">
                      Price (Coins) *
                    </span>
                  </label>
                  <input
                    id="quest-price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.price ? "input-error" : ""
                    }`}
                    placeholder="0"
                    min="0"
                    required
                    aria-invalid={errors.price ? "true" : "false"}
                    aria-describedby={
                      errors.price ? "quest-price-error" : undefined
                    }
                  />
                  {errors.price && (
                    <span
                      id="quest-price-error"
                      className="label-text-alt text-error"
                    >
                      {errors.price}
                    </span>
                  )}
                  <label className="label">
                    <span className="label-text-alt opacity-60">
                      Set to 0 for free quests
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label htmlFor="quest-xp" className="label">
                    <span className="label-text font-medium">XP Reward *</span>
                  </label>
                  <input
                    id="quest-xp"
                    type="number"
                    name="xp"
                    value={formData.xp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.xp ? "input-error" : ""
                    }`}
                    placeholder="100"
                    min="0"
                    required
                    aria-invalid={errors.xp ? "true" : "false"}
                    aria-describedby={errors.xp ? "quest-xp-error" : undefined}
                  />
                  {errors.xp && (
                    <span
                      id="quest-xp-error"
                      className="label-text-alt text-error"
                    >
                      {errors.xp}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="quest-reward" className="label">
                    <span className="label-text font-medium">Reward *</span>
                  </label>
                  <input
                    id="quest-reward"
                    type="text"
                    name="reward"
                    value={formData.reward}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.reward ? "input-error" : ""
                    }`}
                    placeholder="e.g., Legendary Sword, 100 Gold Coins"
                    required
                    aria-invalid={errors.reward ? "true" : "false"}
                    aria-describedby={
                      errors.reward ? "quest-reward-error" : undefined
                    }
                  />
                  {errors.reward && (
                    <span
                      id="quest-reward-error"
                      className="label-text-alt text-error"
                    >
                      {errors.reward}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="quest-popularity" className="label">
                    <span className="label-text font-medium">
                      Popularity (0-100) *
                    </span>
                  </label>
                  <input
                    id="quest-popularity"
                    type="number"
                    name="popularity"
                    value={formData.popularity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${
                      errors.popularity ? "input-error" : ""
                    }`}
                    placeholder="50"
                    min="0"
                    max="100"
                    required
                    aria-invalid={errors.popularity ? "true" : "false"}
                    aria-describedby={
                      errors.popularity ? "quest-popularity-error" : undefined
                    }
                  />
                  {errors.popularity && (
                    <span
                      id="quest-popularity-error"
                      className="label-text-alt text-error"
                    >
                      {errors.popularity}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="alert alert-error" role="alert">
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="status">
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-8 min-w-50 text-white rounded-2xl"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Quest"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
