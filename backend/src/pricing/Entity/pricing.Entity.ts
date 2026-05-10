import { Column,Entity,PrimaryGeneratedColumn,} from 'typeorm';

export enum PricingType {
    MEMBERSHIP = 'membership',
    EXTRA = 'extra',
}

@Entity('pricing')
export class PricingEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: PricingType,
    })
    type: PricingType;

    @Column()
    price: number;

    @Column({
        nullable: true,
    })
    frequency: string;

    @Column({
        nullable: true,
    })
    duration: string;

    @Column({
        nullable: true,
    })
    gender: string;

    @Column({
        default: false,
    })
    allowQuantity: boolean;
}