from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product, ProductSale

class AddSaleView(APIView):
    def post(self, request):
        try:
            product_id = request.data.get("product_id")
            amount = request.data.get("amount")
            price = request.data.get("price")

            if not product_id or not amount:
                return Response(
                    data={"message": "Помилка: Необхідно вказати product_id та amount."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                amount = int(amount)
                if amount <= 0:
                    raise ValueError
            except ValueError:
                return Response(
                    data={"message": "Помилка: Кількість повинна бути додатнім числом."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    data={"message": "Помилка: Продукт з вказаним ID не знайдено."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if product.amount < amount:
                return Response(
                    data={
                        "message": f"Помилка: В наявності менше товару ({product.amount}шт.), ніж ви хочете продати ({amount}шт.).",
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Визначаємо ціну продажу
            sell_price = price or product.sell_price

            # Створюємо запис продажу
            ProductSale.objects.create(
                product=product,
                amount=amount,
                sell_price=sell_price
            )

            # Оновлюємо кількість товару
            product.amount -= amount
            product.save()

            return Response(
                data={
                    "message": f"Успішно додано {amount}шт. до {product.producer.value} - {product.name}!",
                },
                status=status.HTTP_200_OK
            )

        except Exception as ex:
            return Response(
                data={
                    "message": f"Помилка: {str(ex)}",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
