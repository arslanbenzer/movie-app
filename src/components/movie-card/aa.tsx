import React, { useState } from "react";
import { Select } from "@mantine/core";

// Enum definition
enum Status {
    Pending = "PENDING",
    Approved = "APPROVED",
    Rejected = "REJECTED",
}

// Mapping enum to select options
const statusOptions = Object.values(Status).map((status) => ({
    value: status,  // Ensuring the value is of type string
    label: status.charAt(0) + status.slice(1).toLowerCase(), // Human-readable label
}));

function StatusSelect() {
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    return (
        <Select
            label="Select Status"
            value={selectedStatus ?? ""}
            onChange={(value) => setSelectedStatus(value as Status)}  // Ensure value is of type Status
            data={statusOptions}
            placeholder="Pick a status"
        />
    );
}

export default StatusSelect;