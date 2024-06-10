import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor MushroomStore {

  type Mushroom = {
    id : Nat;
    Title : Text;
    Description : Text;
    Price : Nat;
  };

  var mushrooms : [Mushroom] = [];

  public func AddMushroom(Description : Text, Price : Nat, Title : Text,) : async Bool {
    let newId = Array.size(mushrooms) +1;
    let newMushroom = {
      id = newId;
      Title = Title;
      Description = Description;
      Price = Price;
    };

    mushrooms := Array.append<Mushroom>(mushrooms, [newMushroom]);
    return true;
  };

  public func getAllMushroom() : async [Mushroom] {
    return mushrooms;
  };
  public func getMushroomById(id : Nat) : async ?Mushroom {
    return Array.find<Mushroom>(mushrooms, func(m) { m.id == id });
  };
  public func updateMushroom(id : Nat, Description : Text, Price : Nat, Title : Text) : async Bool {
    let mushroomToUpdate = Array.find<Mushroom>(mushrooms, func(mushroom) { mushroom.id == id });

    switch (mushroomToUpdate) {
      case (null) { return false };
      case (?mushroomToUpdate) {
        let updateMushroom = {
          id = id;
          Title = Title;
          Description = Description;
          Price = Price;
        };
        mushrooms := Array.map<Mushroom, Mushroom>(mushrooms, func(m) { if (m.id == id) { updateMushroom } else { m } });
        return true;
      };
    };
  };

  public func deleteMushroom(id : Nat) : async Bool {
    let mushroom = Array.find<Mushroom>(mushrooms, func(mushroom) { mushroom.id == id });
    if (mushroom != null) {
      mushrooms := Array.filter<Mushroom>(mushrooms, func(mushroom) { mushroom.id != id });
      return true;
    } else {
      return false;
    };
  };

};

