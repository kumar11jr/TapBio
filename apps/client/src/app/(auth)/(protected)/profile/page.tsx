"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Mobile } from "@/components";

interface CardItem {
  linkName: string;
  linkURL: string;
  editing: boolean;
}

const Profile: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);

  const addCard = () => {
    const newCard: CardItem = {
      linkName: "",
      linkURL: "",
      editing: true,
    };
    setCards([...cards, newCard]);
  };

  const handleLinkNameChange = (
    index: number,
    event: any
  ) => {
    const updatedCards: any[any] = [...cards];
    updatedCards[index].linkName = event.target.value;
    setCards(updatedCards);
  };

  const handleLinkURLChange = (
    index: number,
    event: any
  ) => {
    const updatedCards: any = [...cards];
    updatedCards[index].linkURL = event.target.value;
    setCards(updatedCards);
  };

  const handleSave = (index: number) => {
    const updatedCards: any = [...cards];
    updatedCards[index].editing = false;
    setCards(updatedCards);

    console.log(`Saved changes for card ${index + 1}:`, updatedCards[index]);
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-3/4">
        <Button
          className="bg-blue-500 hover:text-blue-600"
          variant="contained"
          onClick={addCard}>
          Add link
        </Button>
        <div className="mt-4">
          {cards.map((card, index) => (
            <div key={index} className="my-4">
              {card.editing ? (
                <Card>
                  <CardContent>
                    <TextField
                      label="Link Name"
                      value={card.linkName}
                      onChange={(event) => handleLinkNameChange(index, event)}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      label="Link URL"
                      value={card.linkURL}
                      onChange={(event) => handleLinkURLChange(index, event)}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                    <Button
                      className="bg-blue-500 hover:text-blue-600"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index)}>
                      Save
                    </Button>
                    <Button
                      className="bg-red-500 hover:text-red-600"
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {card.linkName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.linkURL}
                    </Typography>
                    <Button
                      className="bg-blue-500 hover:text-blue-600"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const updatedCards: any = [...cards];
                        updatedCards[index].editing = true;
                        setCards(updatedCards);
                      }}>
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:text-red-600"
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-[100%]">
        <Mobile cards={cards} />
      </div>
    </div>
  );
};

export default Profile;
