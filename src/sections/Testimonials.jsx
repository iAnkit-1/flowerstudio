import React, { useState } from 'react';
import { Star, MessageSquare, Quote, CheckCircle, PenTool } from 'lucide-react';

export default function Testimonials({ testimonials, onAddTestimonial }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview = {
      id: `review-${Date.now()}`,
      name,
      location: location ? `${location}, Chandigarh` : 'Chandigarh',
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    onAddTestimonial(newReview);
    setSuccessMsg(true);
    setName('');
    setLocation('');
    setRating(5);
    setComment('');
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16 text-center">
          <span className="text-xs font-bold text-lotus-pink uppercase tracking-widest">Client Reviews</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Loved By <span className="text-lotus-pink">Chandigarh</span> Locals
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Read what our patrons in Sector 15, 22, 29, 35, and other localities say about our flowers and cakes.
          </p>
        </div>

        {/* Grand Launch Day Review Incentive Banner */}
        <div className="bg-gradient-to-r from-lotus-pink-light/80 to-lotus-green-light/80 border border-pink-100 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="text-center md:text-left space-y-1">
            <span className="bg-lotus-pink text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Launch Day Special
            </span>
            <h3 className="font-sans font-bold text-slate-800 text-base mt-1">
              Help us celebrate our Grand Launch! 💐
            </h3>
            <p className="text-xs text-slate-500">
              Leave a quick rating or testimonial today. As a thank-you, get a **Free Message Card & Premium Rose** with your next order!
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              const el = document.querySelector('#reviews');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            Leave a Rating &rarr;
          </button>
        </div>

        {/* Dashboard and Testimonials split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Review Summary & Write Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-center space-y-5 shadow-sm">
              <h3 className="font-sans font-bold text-slate-800 text-lg">Listing Overview</h3>
              
              {/* Score Display */}
              <div className="space-y-1">
                <p className="text-5xl font-black text-slate-900 leading-none">4.4</p>
                <div className="flex justify-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 fill-current ${
                        i < 4 ? 'text-amber-400' : i === 4 ? 'text-amber-400/30' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Average Rating</p>
              </div>

              <span className="h-px w-16 bg-slate-200 block mx-auto"></span>

              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                Based on 77+ verified customer ratings on Justdial listing.
              </p>

              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold py-3 px-6 rounded-xl hover:opacity-95 shadow-md shadow-pink-100 transition-all cursor-pointer text-sm"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowForm(false)}
                  className="w-full border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer text-sm bg-white"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Write a Review Collapsible Form Card */}
            {showForm && (
              <div className="bg-white border border-slate-150 p-6 rounded-3xl shadow-lg animate-scaleIn space-y-4">
                <h4 className="font-sans font-bold text-slate-800 text-base">Write Your Review</h4>
                
                {successMsg ? (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-xs">Review Shared!</p>
                      <p className="text-[10px] mt-1">Thank you. Your review is now listed on our storefront board.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Stars Select */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Your Rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 fill-current transition-colors ${
                                star <= (hoverRating || rating)
                                  ? 'text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aman Deep"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                      />
                    </div>

                    {/* Sector Location */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Sector/Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Sector 29"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                      />
                    </div>

                    {/* Review Comments */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Review Details</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Share your experience with our fresh flowers, delivery, or cake taste..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                    >
                      Publish Review
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Testimonial Cards List */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[580px] overflow-y-auto pr-2 no-scrollbar">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-slate-50/65 border border-slate-100 p-6 rounded-2xl relative space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-200/50 transform rotate-180" />
                
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 fill-current ${
                          i < test.rating ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-slate-100/60 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{test.name}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">{test.location}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
