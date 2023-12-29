import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { BaseURL } from "../baseURL";
import AuthContext from "@/contexts/AuthContext";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { FilterCards } from "./filterCards";

const formatDate = (datetimeString: any) => {
  let dayObject = new Date(datetimeString);
  let day: any = dayObject.getUTCDate();
  let month: any = dayObject.getUTCMonth();
  let year = dayObject.getUTCFullYear();
  let hours: any = dayObject.getUTCHours();
  let minutes: any = dayObject.getUTCMinutes();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};




const Cards = () => {
  const [cards, setCards] = useState<any>()
  let authTokens = useContext(AuthContext)?.authTokens;
  useEffect(() => {
    const getAllCards = async () => {
      const response = await fetch(BaseURL + 'tascrum/card-boards/', {
        method: 'GET',
        headers: {
          Authorization: `JWT ${authTokens.access}`
        },
      })
      const data = await response.json();
      setCards(data)
    }
    getAllCards()
  }, [])
  return (
    <>
      <FilterCards />
      <div className="w-full flex justify-center flex-col">
        <Table>
          <TableCaption>Cards List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Card</TableHead>
              <TableHead>List</TableHead>
              <TableHead>Labels</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Story Points</TableHead>
              <TableHead>Workspace</TableHead>
              <TableHead className="text-center">Board</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards?.map((card: any) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium">{card.title}</TableCell>
                <TableCell>{card.list.title}</TableCell>
                <TableCell>{card.labels.map((label: any) => (
                  <Badge key={label.id} style={{ backgroundColor: label.color }}>{label.title}</Badge>
                ))}</TableCell>
                <TableCell>{formatDate(card.duedate)}</TableCell>
                <TableCell>{card.storypoint}</TableCell>
                <TableCell>
                  <p>{card.list.board.workspace.name}</p>
                </TableCell>
                <TableCell className="w-full flex flex-row">
                  <img className="h-9 w-16 rounded mr-1" src={card.list.board.backgroundimage} />
                  <p>{card.list.board.title}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >
    </>
  );
};

export default Cards;
