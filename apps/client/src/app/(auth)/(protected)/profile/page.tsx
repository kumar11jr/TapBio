"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

  const handleLinkNameChange = (index: number, event: any) => {
    const updatedCards: any[any] = [...cards];
    updatedCards[index].linkName = event.target.value;
    setCards(updatedCards);
  };

  const handleLinkURLChange = (index: number, event: any) => {
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
      <div className="w-[70%]">
        <Button
          className="bg-blue-500 hover:text-blue-600"
          // variant="contained"
          onClick={addCard}>
          Add link
        </Button>
        <div className="mt-4">
          {cards.map((card, index) => (
            <div key={index} className="my-4">
              {card.editing ? (
                <Card className="w-[300px] md:w-[950px]">
                <CardHeader>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Add Link</Label>
                        <Input id="name" placeholder="Paste Link here" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Platform</Label>
                        <Select>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="github">GitHub</SelectItem>
                            <SelectItem value="linkedIn">
                              LinkedIn
                            </SelectItem>
                            <SelectItem value="instagran">Instagram</SelectItem>
                            <SelectItem value="x">X</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
              ) : (
                <Card className="w-[300px] md:w-[950px]">
                  <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Platform</Label>
                          <Select>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="github">GitHub</SelectItem>
                              <SelectItem value="linkedIn">
                                LinkedIn
                              </SelectItem>
                              <SelectItem value="instagran">Instagram</SelectItem>
                              <SelectItem value="x">X</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-[30%]">
        <Mobile cards={cards} />
      </div>
    </div>
  );
};

export default Profile;
