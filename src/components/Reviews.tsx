import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeReviewProduct } from '../types/types';

const reviewProduct = {
  email: '',
  text: '',
  rating: '',
};

export default function Reviews() {
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [star, setStar] = useState(false);
  const [review, setReviews] = useState<TypeReviewProduct>(reviewProduct);
  const [salveReviews, setSalveReviews] = useState<TypeReviewProduct[]>([]);
  const { email, text, rating } = review;

  const { id } = useParams();

  const rates = [1, 2, 3, 4, 5];
  const validEmail = /^[ a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const recoveryReviews = localStorage.getItem(id as string);
    if (recoveryReviews) {
      const recovery = JSON.parse(recoveryReviews);
      setSalveReviews(recovery);
      setShowReview(true);
    }
  }, []);

  useEffect(() => {
    if (id) {
      localStorage.setItem(id, JSON.stringify(salveReviews));
    }
  }, [salveReviews]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validEmail.test(email) && rating.length > 0) {
      setSalveReviews([...salveReviews, review]);
      setReviews(reviewProduct);
      setShowReview(true);
      setErrorMsg(false);
    } else {
      setErrorMsg(true);
    }
  };

  const handleChange = ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { title, value } = target;
    setReviews({
      ...review,
      [title]: value,
    });
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label>
          <input
            type="text"
            data-testid="product-detail-email"
            placeholder="Email"
            value={ email }
            title="email"
            onChange={ handleChange }
          />
        </label>
        {rates.map((rate) => (
          <label htmlFor={ `${rate}-rating` } key={ rate }>
            {!star
              ? <img src="/empty_star.svg" alt="Star" width={ 20 } />
              : <img src="/full_star.svg" alt="Full Star" width={ 20 } />}
            <input
              type="checkbox"
              value={ rate }
              title="rating"
              name={ `${rate}-rating` }
              data-testid={ `${rate}-rating` }
              onChange={ handleChange }
            />
          </label>
        ))}
        <textarea
          placeholder="Mensagem (Opcional)"
          title="text"
          value={ text }
          cols={ 30 }
          rows={ 10 }
          data-testid="product-detail-evaluation"
          onChange={ handleChange }
        />
        <button data-testid="submit-review-btn">Avaliar</button>
        {errorMsg && <p data-testid="error-msg">Campos inválidos</p>}
      </form>
      {showReview && (
        <div>
          {salveReviews.map((salveReview, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{salveReview.email}</p>
              <p data-testid="review-card-rating">{salveReview.rating}</p>
              <p data-testid="review-card-evaluation">{salveReview.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
