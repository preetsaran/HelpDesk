#include<stdio.h>
int main()
{
    int num;
    int newnum=0;
    printf("enter a 4 digit number:\n");
    scanf("%d",&num);

    //printf("your number is:\n");

        while(num>0)
        {
            newnum = newnum*10 + num%10;
            num = num / 10;
        }
    printf("%d",newnum);

    printf("your number digit wise:\n");
        for (int i = 0; i < 4;i++)
        {
            printf("%d\n", newnum % 10);
            newnum = newnum / 10;
        }
    return 0;
}   