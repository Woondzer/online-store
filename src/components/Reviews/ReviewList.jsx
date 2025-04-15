import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import StarRating from "../StarRating";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [collectionPath, setCollectionPath] = useState(null);

  // Avgör var recensionerna finns games eller products
  useEffect(() => {
    setReviews([]);
    setCollectionPath(null);

    const fetchCollectionPath = async () => {
      const gameRef = collection(db, `games/${productId}/reviews`);
      const productRef = collection(db, `products/${productId}/reviews`);

      try {
        const gameSnapshot = await getDocs(gameRef);
        if (!gameSnapshot.empty) {
          setCollectionPath(`games/${productId}/reviews`);
          return;
        }

        const productSnapshot = await getDocs(productRef);
        if (!productSnapshot.empty) {
          setCollectionPath(`products/${productId}/reviews`);
        }
      } catch (err) {
        console.error("Fel vid hämtning av reviews:", err);
      }
    };

    fetchCollectionPath();
  }, [productId]);

  // Hämta recensionerna från rätt plats
  useEffect(() => {
    const fetchReviews = async () => {
      if (!collectionPath) return;

      const q = query(
        collection(db, collectionPath),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);

      const loaded = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(loaded);
    };

    fetchReviews();
  }, [collectionPath]);

  if (!reviews.length)
    return <p className="text-gray-500">Inga recensioner ännu.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-black">Recensioner</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded shadow p-4 text-black space-y-2"
        >
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{review.username}</span>
            <span>
              {review.createdAt?.toDate
                ? review.createdAt.toDate().toLocaleDateString("sv-SE")
                : "Datum saknas"}
            </span>
          </div>
          <StarRating rating={review.rating} />
          <p className="text-sm">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
