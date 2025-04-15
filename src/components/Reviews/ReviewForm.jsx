import { useState, useEffect } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

const ReviewForm = ({ productId, onSubmitted }) => {
  const { user, extraUserData } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [collectionPath, setCollectionPath] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const determineCollectionPath = async () => {
      const gameDoc = await getDoc(doc(db, "games", productId));
      if (gameDoc.exists()) {
        setCollectionPath(`games/${productId}/reviews`);
      } else {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (productDoc.exists()) {
          setCollectionPath(`products/${productId}/reviews`);
        }
      }
    };
    determineCollectionPath();
  }, [productId]);

  if (!user || !extraUserData || !collectionPath) return null;

  const handleSubmit = async () => {
    if (!review.trim() || rating === 0) {
      toast.warning("Du måste ge ett betyg och skriva en kommentar.");
      return;
    }

    const newReview = {
      userId: user.uid,
      username: extraUserData.username,
      rating,
      review,
      createdAt: new Date(),
      votes: {
        up: [],
        down: [],
      },
    };

    try {
      await addDoc(collection(db, collectionPath), newReview);
      setReview("");
      setRating(0);
      setExpanded(false);
      toast.success("Tack för din kommentar!");
      if (onSubmitted) onSubmitted();
    } catch (error) {
      console.error("Kunde inte spara kommentar:", error);
      toast.error("Något gick fel. Försök igen.");
    }
  };

  return (
    <>
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="btn bg-[#FF9900] border-none text-black hover:bg-black hover:text-[#FF9900] font-semibold rounded px-6 py-2"
        >
          Betygsätt produkt
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-black w-full">
          <h3 className="text-lg font-semibold mb-4">Lämna en kommentar</h3>

          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
            rows={4}
            placeholder="Skriv din kommentar här..."
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="btn bg-[#FF9900] border-none text-black hover:bg-black hover:text-[#FF9900] font-semibold rounded px-4 py-2"
            >
              Spara
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
