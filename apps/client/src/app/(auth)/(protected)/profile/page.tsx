"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mobile } from "@/components";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface CardItem {
  linkURL: string;
  editing: boolean;
}

const Profile: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [platform, setPlatform] = useState([]);
  const [userData, setUserData] = useState<{
    username: string;
    name: string;
    email: string;
  }>();
  const [authToken, setAuthToken] = useState<string | null>();
  const { toast } = useToast();

  const addCard = () => {
    const newCard: CardItem = {
      linkURL: "",
      editing: true,
    };
    setCards([...cards, newCard]);
  };
// Managing Inputs
  const handleLinkURLChange = (index: number, event: any) => {
    const updatedCards: any = [...cards];
    updatedCards[index].linkURL = event.target.value;
    setCards(updatedCards);
  };

  const handleSave = (index: number) => {
    const updatedCards: any = [...cards];
    updatedCards[index].editing = false;
    setCards(updatedCards);
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

// Pushing To DB
  const pushToDB = () => {
    const dbLinkUrl: string[] = [];
    cards.map((card) => {
      dbLinkUrl.push(card.linkURL);
    });
    const headers = {
      headers: {
        "tapbio-token": authToken,
      },
    };
    axios
      .post(
        "http://localhost:8080/api/v1/data/addurl",
        { links: dbLinkUrl },
        headers
      )
      .then((res) => {
        console.log(res);
      });
  };

// Getting User Info from Me route
  const getUserInfo = (token: string) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get("http://localhost:8080/api/v1/user/me", config).then((res) => {
      setUserData(res.data);
    });
  };

  useEffect(() => {
    const lc = localStorage.getItem("tapbio-token");
    setAuthToken(lc);
    getUserInfo(lc!);
  }, []);

  return (
    <div className="h-[100vh] flex justify-center p-4">
      <div className="w-[70%]">
        <Button
          className="bg-blue-500 hover:text-blue-600 mx-2"
          // variant="contained"
          onClick={addCard}>
          Add link
        </Button>
        <Button className="mx-2" onClick={pushToDB} variant={"outline"}>
          Save
        </Button>
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hidden">
          <div className="mt-4">
            {cards.map((card, index) => (
              <div key={index} className="my-4">
                {card.editing ? (
                  <Card
                    id={index.toString()}
                    className="w-[300px] md:w-[950px]">
                    <CardHeader></CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Add Link</Label>
                            <Input
                              id="name"
                              value={card.linkURL}
                              onChange={(event) =>
                                handleLinkURLChange(index, event)
                              }
                              placeholder="Paste Link here"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="platform">Platform</Label>
                            <Select
                              value={platform[index]}
                              onValueChange={(e) => {
                                setPlatform((prev) => {
                                  const updatedCards: any = [...prev];
                                  updatedCards[index] = e.valueOf();
                                  return updatedCards;
                                });
                              }}>
                              <SelectTrigger id="platform">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="GitHub">GitHub</SelectItem>
                                <SelectItem value="LinkedIn">
                                  LinkedIn
                                </SelectItem>
                                <SelectItem value="Instagram">
                                  Instagram
                                </SelectItem>
                                <SelectItem value="X">X</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => handleDelete(index)}
                        variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={() => handleSave(index)}>Save</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card
                    id={index.toString()}
                    className="w-[300px] md:w-[950px]">
                    <CardHeader></CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">{card.linkURL}</Label>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">{platform[index]}</Label>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => handleDelete(index)}
                        variant="outline">
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          const updatedCards: any = [...cards];
                          updatedCards[index].editing = true;
                          setCards(updatedCards);
                        }}>
                        Edit
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-[30%]">
        <Mobile cards={cards} platform={platform} user={userData?.username!} />
      </div>
    </div>
  );
};

export default Profile;
